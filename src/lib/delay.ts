export default async function delay(ms: number = 400) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
