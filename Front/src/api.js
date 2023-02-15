const URL = "https://ozitest.herokuapp.com";
export async function getUser({ userId, password }) {
  const res = await fetch(`${URL}/api/members/${userId}`);
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

export async function getUserInfo(userId) {
  const res = await fetch(`${URL}/api/members/${userId}`);
  if (!res) throw new Error("회원 조회에 실패했습니다");
  const body = await res.json();

  return body;
}

export async function joinMember(formData) {
  console.log(formData);
  console.log(JSON.stringify(formData));
  const response = await fetch(`${URL}/api/members/`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("회원정보 등록에 실패");
  }
  const body = await response.json();
  return body;
}

export async function modMember(userId, member) {
  const res = await fetch(`${URL}/api/members/${userId}`, {
    method: "PUT",
    body: member,
  });
  if (!res) throw new Error("회원정보 수정에 실패하였습니다");
  const body = await res.json();
  return body;
}

export async function modTable(id, table) {
  const res = await fetch(`${URL}/api/tables/${id}`, {
    method: "PUT",
    body: table,
  });
  if (!res) throw new Error("스터디 정보 수정에 실패하였습니다");
  const body = await res.json();
  return body;
}

export async function delMember(userId) {
  const res = await fetch(`${URL}/api/members/${userId}`, {
    method: "DELETE",
  });
  if (!res) throw new Error("회원 삭제에 실패하였습니다");
  const body = await res.json();
  return body;
}

export async function getStudyList() {
  const res = await fetch(`${URL}/api/tables`);
  if (!res) throw new Error("스터디조회실패!");
  const body = await res.json();
  return body;
}

export async function getStudy(id) {
  const res = await fetch(`${URL}/api/tables/${id}`);
  if (!res) throw new Error("스터디조회실패!");
  const body = await res.json();
  return body;
}

export async function getMyStudy(id) {
  const res = await fetch(`${URL}/api/tables/myStudy/${id}`);
  if (!res) throw new Error("스터디조회실패!");
  const body = await res.json();
  console.log(body);
  return body;
}

export async function regiStudy(formData) {
  const response = await fetch(`${URL}/api/tables/`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("스터디 등록 실패");
  }
  const body = await response.json();
  return body;
}

export async function search(searchText) {
  const res = await fetch(`${URL}/api/tables/search/${searchText}`);
  if (!res) throw new Error("검색대작전 대실패!");
  const body = await res.json();
  return body;
}

export async function delStudy(id) {
  const res = await fetch(`${URL}/api/tables/${id}`, {
    method: "DELETE",
  });
  if (!res) throw new Error("스터디 삭제에 실패하였습니다");
  const body = await res.json();
  return body;
}

export async function getComment(studyId) {
  const res = await fetch(`${URL}/api/comments/${studyId}`);
  if (!res) throw new Error("댓글검색대작전 대실패!");
  const body = await res.json();
  return body;
}

export async function writeComment(formData) {
  const response = await fetch(`${URL}/api/comments/`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("댓글 등록 실패");
  }
  const body = await response.json();
  return body;
}

export async function delComment(id) {
  const res = await fetch(`${URL}/api/comments/${id}`, {
    method: "DELETE",
  });
  if (!res) throw new Error("댓글 삭제에 실패하였습니다");
  const body = await res.json();
  return body;
}

export async function modComment(id, comment) {
  const res = await fetch(`${URL}/api/comments/${id}`, {
    method: "PUT",
    body: comment,
  });
  if (!res) throw new Error("댓글 수정에 실패하였습니다");
  const body = await res.json();
  return body;
}

export async function getImage(image) {
  console.log("getImage");
  const res = await fetch(`${URL}/api/image/${image}`);
  const body = await res.json();
  return body;
}
