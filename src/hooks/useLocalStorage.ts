import { useState, useEffect, useCallback } from "react";
import { CommentFragment } from "@/entities/comment/types";

type LocalStorageSchema = {
  "test-blog:comments": CommentFragment[];
};

type Key = keyof LocalStorageSchema;

const eventKind = "test-blog:LocalStorageEvent";

type KVP = {
  key: Key;
  value: string | null;
  kind?: typeof eventKind;
};

class LocalStorageChanged extends CustomEvent<KVP> {
  static eventName = "onLocalStorageChange";

  constructor(payload: KVP) {
    super(LocalStorageChanged.eventName, {
      detail: { ...payload, kind: eventKind },
    });
  }
}

export const getItem = <T extends keyof LocalStorageSchema>(
  key: T
): LocalStorageSchema[T] | null => {
  const value = localStorage.getItem(key);
  return value && JSON.parse(value);
};

export const setItem = <K extends Key>(
  key: K,
  value: LocalStorageSchema[K]
) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
  window.dispatchEvent(
    new LocalStorageChanged({ key, value: stringifiedValue })
  );
};

export const removeItem = (key: Key) => {
  localStorage.removeItem(key);
  window.dispatchEvent(new LocalStorageChanged({ key, value: null }));
};

const useLocalStorage = <K extends Key>(key: K) => {
  const [localState, updateLocalState] = useState<
    LocalStorageSchema[K] | null | undefined
  >(undefined);

  useEffect(() => {
    updateLocalState(getItem(key));
  }, [key]);

  useEffect(() => {
    const parse = (value: string | null) => value && JSON.parse(value);

    function onLocalStorageChange(event: { detail: KVP } | StorageEvent) {
      if (event instanceof StorageEvent) {
        if (event.key === key) {
          updateLocalState(parse(event.newValue));
        }
      } else if (event.detail && event.detail.kind === eventKind) {
        const data = event.detail;
        if (data.key === key) {
          updateLocalState(parse(data.value));
        }
      }
    }

    window.addEventListener(
      LocalStorageChanged.eventName,
      onLocalStorageChange as EventListener
    );
    window.addEventListener("storage", onLocalStorageChange);

    return () => {
      window.removeEventListener(
        LocalStorageChanged.eventName,
        onLocalStorageChange as EventListener
      );
      window.removeEventListener("storage", onLocalStorageChange);
    };
  }, [key]);

  const setLocalState = useCallback(
    (value: LocalStorageSchema[K]) => setItem(key, value),
    [key]
  );

  return [localState, setLocalState] as const;
};

export default useLocalStorage;
