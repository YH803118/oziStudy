export async function getUser({ userId, password }) {
  const response = await fetch(`localhost:3001/api/${userId}`);
  const body = await response.json();
  if (body.password === password) return true;
  else return false;
}
