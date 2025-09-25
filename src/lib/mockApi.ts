export const mockApiRequest = (
  data: any,
  success: boolean = true,
  delay: number = 5000
): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({
          success: true,
          message: "Данные успешно отправлены",
          data: {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            createdAt: new Date().toISOString(),
          },
        });
      } else {
        reject(new Error("Ошибка сервера: не удалось отправить данные"));
      }
    }, delay);
  });
};
