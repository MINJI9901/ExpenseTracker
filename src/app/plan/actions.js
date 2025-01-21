"use server"

export async function postCategory(date) {
    const response = await fetch(`http://localhost:3000/api/expense/category?month=${date.getMonth()}&year=${date.getFullYear()}`, {
        method: 'POST'
    })

    const data = await response.json();

    return data
}