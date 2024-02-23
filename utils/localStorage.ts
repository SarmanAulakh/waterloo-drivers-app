import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Data stored successfully");
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

export const fetchData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Data fetched successfully:", value);
      return value;
    } else {
      console.log("No data found for key:", key);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const clearData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Data cleared successfully");
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};
