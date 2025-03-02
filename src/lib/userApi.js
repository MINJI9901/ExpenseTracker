export async function getUser(userId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user?userId=${userId}`
  );

  const data = await response.json();

  return data;
}

// export async function addUser(userId) {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
//     method: "POST",
//     body: JSON.stringify({ userId: userId }),
//   });

//   const data = await response.json();

//   return data;
// }

export async function updateUserProfile(userId, body) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: "POST",
    body: JSON.stringify({ ...body, userId: userId }),
  });

  const data = await response.json();

  return data;
}
