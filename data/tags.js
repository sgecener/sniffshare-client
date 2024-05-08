
import {
  fetchWithResponse,
  fetchWithoutResponse,
  fetchIgnore404,
} from "./fetcher";


export function getTags() {
    return fetchWithResponse("tags", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
  }

  export async function getTagNameById(tagId) {
    const data = await fetchWithResponse(`tags/${tagId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      return data.name;
    
  }


  

