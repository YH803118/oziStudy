export async function getUser({ userId, password }) {
  console.log(userId);
  console.log(password);
  const response = await fetch(`http://localhost:3000/api/members/${userId}`);
  const body = await response.json();
  console.log(body);
  if (body.password === password) {
    console.log("로그인성공");
    return body;
  } else {
    console.log("로그인실패ㅜㅜ");
    return false;
  }
}
