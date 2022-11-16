export async function getUser() {
  const response = await fetch(`localhost:3001/api/login`);
  const body = await response.json();
  return body;
}
