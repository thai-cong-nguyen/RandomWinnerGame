import axios from "axios";

export async function subgraphQuery(query) {
  try {
    const SUBGRAPH_URL =
      "https://api.thegraph.com/subgraphs/name/thai-cong-nguyen/learnweb3";
    const response = await axios.get(SUBGRAPH_URL, { query });
    if (response.data.errors) {
      console.error("Error: " + response.data.errors);
      throw new Error(`Error making subgraph query ${response.data.errors}`);
    }
  } catch (error) {}
}
