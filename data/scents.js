import {
  fetchWithResponse,
  fetchWithoutResponse,
  fetchIgnore404,
} from "./fetcher";

export function getScents() {
  return fetchWithResponse("scent_posts", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function getScentById(id) {
  return fetchWithResponse(`scent_posts/${id}`, {
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



export function addScent(scent) {
  return fetchWithResponse(`scent_posts`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scent),
  });
}

export function editScent(id, scent) {
  return fetchWithoutResponse(`scent_posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scent),
  });
}

export function deleteScent(id) {
  return fetchWithoutResponse(`scent_posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function favoriteScent(scentId) {
  return fetchWithoutResponse(`scent_posts/${scentId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
}

export function unFavoriteScent(scentId) {
  return fetchWithoutResponse(`scent_posts/${scentId}/unlike`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
}
