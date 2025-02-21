import { v4 as uuid } from "uuid";

// ACTUAL BREAKDOWN DATABASE (EXPENSE / INCOME)
export function getBreakdownLocal(section, date) {
  const breakdownData =
    JSON.parse(localStorage.getItem(`${section.toLowerCase()}Breakdown`)) || [];
  console.log("get breakdownData: ", breakdownData);

  const data = breakdownData.filter((breakdown) => {
    const formattedDate = new Date(breakdown.date);
    return formattedDate > date.start && formattedDate < date.end;
  });

  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  return data;
}

export function addBreakdownLocal(section, body) {
  const breakdownData =
    JSON.parse(localStorage.getItem(`${section.toLowerCase()}Breakdown`)) || [];
  const { name, amount, category, sub_category, date } = body;

  const newBreakdown = {
    _id: uuid(),
    name: name,
    amount: amount,
    category: category[0],
    sub_category: sub_category[0],
    date: date ? date : new Date(),
  };

  breakdownData.push(newBreakdown);

  console.log("added breakdownData: ", breakdownData);

  localStorage.setItem(
    `${section.toLowerCase()}Breakdown`,
    JSON.stringify(breakdownData)
  );
}

export function updateBreakdownLocal(section, updatedContent) {
  const breakdownData = JSON.parse(
    localStorage.getItem(`${section.toLowerCase()}Breakdown`)
  );

  breakdownData.forEach((breakdown, idx) => {
    console.log("idx: ", idx, breakdown._id === updatedContent._id);
    if (breakdown._id === updatedContent._id) {
      breakdownData[idx] = updatedContent;
      console.log("idx: ", idx, "updated content: ", updatedContent);
    }
  });

  localStorage.setItem(
    `${section.toLowerCase()}Breakdown`,
    JSON.stringify(breakdownData)
  );

  return breakdownData;
}

export function deleteBreakdownLocal(section, id) {
  const breakdownData = JSON.parse(
    localStorage.getItem(`${section.toLowerCase()}Breakdown`)
  );

  const idx = breakdownData.map((breakdown) => breakdown._id).indexOf(id);

  breakdownData.splice(idx, 1);

  localStorage.setItem(
    `${section.toLowerCase()}Breakdown`,
    JSON.stringify(breakdownData)
  );
}

// CATEGORY DATABASE (EXPENSE / INCOME)
export function getCategoriesLocal(section, date) {
  const categoriesData =
    JSON.parse(localStorage.getItem(`${section.toLowerCase()}Categories`)) ||
    [];

  const data = categoriesData.filter((category) => {
    const formattedDate = new Date(category.date);
    return (
      formattedDate.getMonth() === date.getMonth() &&
      formattedDate.getFullYear() === date.getFullYear()
    );
  });

  return data;
}

export function addCategoryLocal(section, date) {
  const categoryData =
    JSON.parse(localStorage.getItem(`${section.toLowerCase()}Categories`)) ||
    [];
  console.log("local categoryData after: ", categoryData);

  const newCategory = {
    _id: uuid(),
    category: " ",
    sub_category: [
      {
        name: " ",
        budget: 0,
        _id: uuid(),
      },
    ],
    // date: new Date(`${year}-${parseInt(month) + 1}-15`)
    date: date,
  };

  categoryData.push(newCategory);

  localStorage.setItem(
    `${section.toLowerCase()}Categories`,
    JSON.stringify(categoryData)
  );
}

export function addSubCategoryLocal(section, id) {
  const categoryData = JSON.parse(
    localStorage.getItem(`${section.toLowerCase()}Categories`)
  );
  categoryData.forEach((category) => {
    if (category._id === id) {
      category.sub_category.push({
        name: "",
        budget: 0,
        _id: uuid(),
      });
    }
  });

  console.log("new sub added category: ", categoryData);

  localStorage.setItem(
    `${section.toLowerCase()}Categories`,
    JSON.stringify(categoryData)
  );
}

export function updatedCategoryLocal(section, id, updatedContent) {
  const categoryData = JSON.parse(
    localStorage.getItem(`${section.toLowerCase()}Categories`)
  );
  console.log("categoryData for update: ", categoryData);

  categoryData.forEach((category) => {
    if (category._id === id) {
      if (updatedContent.category) {
        category.category = updatedContent.category;
      } else {
        const amount =
          section.toLowerCase() === "expense" ? "budget" : "expected_amount";
        category.sub_category.forEach((sub) => {
          if (sub._id === updatedContent._id) {
            sub.name = updatedContent.name;
            sub[amount] = updatedContent[amount];
          }
        });
      }
    }
  });

  localStorage.setItem(
    `${section.toLowerCase()}Categories`,
    JSON.stringify(categoryData)
  );
}

export function addPastDataLocal(section, newData) {
  const categoryData = JSON.parse(
    localStorage.getItem(`${section.toLowerCase()}Categories`)
  );

  newData.forEach((data) => {
    categoryData.push({ ...data, _id: uuid() });
  });
  console.log("last data added categoryData: ", categoryData);

  localStorage.setItem(
    `${section.toLowerCase()}Categories`,
    JSON.stringify(categoryData)
  );
}

export function deleteCategoryLocal(section, id) {
  const categoryData = JSON.parse(
    localStorage.getItem(`${section.toLowerCase()}Categories`)
  );
  const breakdownData =
    JSON.parse(localStorage.getItem(`${section.toLowerCase()}Breakdown`)) || [];

  console.log("categoryData for delete: ", categoryData);
  console.log("breakdownData for delete: ", breakdownData);

  // FOR CATEGORY
  if (typeof id !== "object") {
    // DELETE CATEGORY FROM CATEGORYDATA
    const idx = categoryData.map((category) => category._id).indexOf(id);
    console.log("idx to delete: ", idx);

    categoryData.splice(idx, 1);

    // REMOVE ALL THE BREAKDOWN THAT BELONGS TO THE CATEGORY
    const idArr = breakdownData.map((breakdown) => breakdown.category._id);
    idArr.forEach(
      (idOfBreakdown, idx) =>
        idOfBreakdown === id && breakdownData.splice(idx, 1)
    );

    // FOR SUBCATEGORY
  } else {
    const { categoryId, subCategoryId } = id;

    // DELETE SUBCATEGORY FROM CATEGORYDATA
    const category = categoryData.filter(
      (category) => category._id === categoryId
    )[0];
    const idx = category.sub_category
      .map((sub) => sub._id)
      .indexOf(subCategoryId);

    console.log("idx to delete: ", idx);

    category.sub_category.splice(idx, 1);

    // REMOVE ALL THE BREAKDOWN THAT BELONGS TO THE SUBCATEGORY
    const idArr = breakdownData.map((breakdown) => breakdown.sub_category._id);
    idArr.forEach(
      (idOfBreakdown, idx) =>
        idOfBreakdown === subCategoryId && breakdownData.splice(idx, 1)
    );
  }

  localStorage.setItem(
    `${section.toLowerCase()}Categories`,
    JSON.stringify(categoryData)
  );

  localStorage.setItem(
    `${section.toLowerCase()}Breakdown`,
    JSON.stringify(breakdownData)
  );
}
