export async function getUser({ userId, password }) {
  const res = await fetch(`http://localhost:3000/api/members/${userId}`);
  if (!res) throw new Error("회원 조회에 실패했습니다");
  const body = await res.json();

  if (body.password === password) {
    console.log("로그인성공");
    return body;
  } else {
    console.log("로그인실패ㅜㅜ");
    return false;
  }
}

export async function joinMember(formData) {
  console.log(formData);
  console.log(JSON.stringify(formData));
  const response = await fetch(`http://localhost:3000/api/members/`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("불러오기 실패");
  }
  const body = await response.json();
  return body;
}

export async function modMember(userId, member) {
  const res = await fetch(`http://localhost:3000/api/members/${userId}`, {
    method: "PUT",
    body: member,
  });
  if (!res) throw new Error("회원정보 수정에 실패하였습니다");
  const body = await res.json();
  return body;
}

export async function delMember(userId) {
  const res = await fetch(`http://localhost:3000/api/members/${userId}`, {
    method: "DELETE",
  });
  if (!res) throw new Error("회원 삭제에 실패하였습니다");
  const body = await res.json();
  return body;
}

export async function getStudyList() {
  const res = await fetch(`http://localhost:3000/api/study`);
  if (!res) throw new error("스터디조회실패!");
  const body = await res.json();
  return body;
}

export async function getMyStudy() {
  const res = await fetch(`http://localhost:3000/api/study/${userId}`);
  if (!res) throw new error("스터디조회실패!");
  const body = await res.json();
  return body;
}
