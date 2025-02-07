// ACTUAL BREAKDOWN DATABASE (EXPENSE / INCOME)
export async function getBreakdown(section, date) {
  const response = await fetch(
    `${process.env.API_URL}/api/${section.toLowerCase()}?start=${
      date.start
    }&end=${date.end}`
  );
  const data = await response.json();

  return data;
}

export async function addBreakdown(section, body) {
  const response = await fetch(
    `${process.env.API_URL}/api/${section.toLowerCase()}`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  return data;
}

export async function deleteBreakdown(section, id) {
  const response = await fetch(
    `${process.env.API_URL}/api/${section.toLowerCase()}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    }
  );

  const data = await response.json();

  return data;
}

// CATEGORY DATABASE (EXPENSE / INCOME)
export async function getCategories(section, date) {
  const response = await fetch(
    `${
      process.env.API_URL
    }/api/${section.toLowerCase()}/category?month=${date.getMonth()}&year=${date.getFullYear()}`
  );
  console.log("date: ", date);
  console.log("month: ", date.getMonth(), "year: ", date.getFullYear());
  const data = await response.json();

  return data;
}

export async function addCategory(section, date) {
  const response = await fetch(
    `${
      process.env.API_URL
    }/api/${section.toLowerCase()}/category?month=${date.getMonth()}&year=${date.getFullYear()}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
}

export async function addSubCategory(section, id) {
  const response = await fetch(
    `${process.env.API_URL}/api/${section.toLowerCase()}/category`,
    {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    }
  );

  const data = await response.json();

  return data;
}

export async function updatedCategory(section, id, updatedContent) {
  const response = await fetch(
    `${process.env.API_URL}/api/${section.toLowerCase()}/category`,
    {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        content: updatedContent,
      }),
    }
  );

  const data = await response.json();
  return data;
}

export async function deleteCategory(section, id) {
  const response = await fetch(
    `${process.env.API_URL}/api/${section.toLowerCase()}/category`,
    {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    }
  );

  const data = await response.json();
  return data;
}
