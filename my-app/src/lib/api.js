import axios from "axios";

const api = axios.create({
    baseURL: "https://api.redclass.redberryinternship.ge/api",
});

const toArray = (data, keys = ["data", "categories", "topics", "instructors"]) => {
    if (Array.isArray(data)) return data;
    for (const key of keys) {
        if (Array.isArray(data[key])) return data[key];
    }
    return [];
};

export const getCategories = () =>
    api.get("/categories").then(r => {
        return toArray(r.data);
    });

export const getTopics = (categoryId) =>
    api.get("/topics", { params: categoryId ? { category_id: categoryId } : {} })
        .then(r => {
            return toArray(r.data);
        });

export const getInstructors = () =>
    api.get("/instructors").then(r => {
        return toArray(r.data);
    });
