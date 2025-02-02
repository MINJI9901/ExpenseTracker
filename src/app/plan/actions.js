export async function addCategory(section, date) {
    const response = await fetch(`http://localhost:3000/api/${section.toLowerCase()}/category?month=${date.getMonth()}&year=${date.getFullYear()}`, {
        method: 'POST'
    })

    const data = await response.json();

    return data
}

export async function addSubCategory(section, id) {
    const response = await fetch(`http://localhost:3000/api/${section.toLowerCase()}/category`, {
        method: 'POST',
        body: JSON.stringify({
            id: id
        })
    })

    const data = await response.json();

    return data
}

export async function updatedCategory(section, id, updatedContent) {    
    const response = await fetch(`http://localhost:3000/api/${section.toLowerCase()}/category`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            content: updatedContent
        })
    })

    const data = await response.json();
    return data
}

export async function deleteCategory(section, id) {    
    const response = await fetch(`http://localhost:3000/api/${section.toLowerCase()}/category`, {
        method: 'DELETE', 
        body: JSON.stringify({
            id: id
        })
    })

    const data = await response.json();
    return data
}