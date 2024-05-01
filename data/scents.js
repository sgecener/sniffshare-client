import { fetchWithResponse, fetchWithoutResponse, fetchIgnore404 } from "./fetcher";

export function getScents() {
    
    return fetchWithResponse("scent_posts", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
}

export function getCategories() {
    return fetchWithResponse("categories", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
  }
  