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

export async function joinMember(member) {
  const res = await fetch(`htttp://localhost:3000/api/members`, {
    method: "POST",
    body: member,
  });
  if (!res) throw new Error("회원등록에 실패하였습니다");
  const body = await res.json();
  return body;
}

export async function modMember(userId, member) {
  const res = await fetch(`htttp://localhost:3000/api/members/${userId}`, {
    method: "PUT",
    body: member,
  });
  if (!res) throw new Error("회원정보 수정에 실패하였습니다");
  const body = await res.json();
  return body;
}

export async function delMember(userId) {
  const res = await fetch(`htttp://localhost:3000/api/members/${userId}`, {
    method: "DELETE",
  });
  if (!res) throw new Error("회원 삭제에 실패하였습니다");
  const body = await res.json();
  return body;
}
