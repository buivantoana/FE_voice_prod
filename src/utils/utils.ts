
import CryptoJS from "crypto-js";

// Hàm sắp xếp object theo thứ tự key tăng dần
function sortObjectByKeys(obj: Record<string, any>) {
  return Object.keys(obj)
    .sort()
    .reduce((sortedObj: Record<string, any>, key) => {
      sortedObj[key] = obj[key];
      return sortedObj;
    }, {});
}

// Hàm tạo chữ ký
export function createSimpleHash(body: any) {
  // Bước 1: Sắp xếp body theo thứ tự key tăng dần
  const sortedBody = sortObjectByKeys(body);
  console.log(sortedBody);
  // Bước 2: Chuyển đổi body đã sắp xếp thành chuỗi JSON
  const jsonBody = JSON.stringify(body);

  // Bước 3: Tạo hash SHA-256 mà không cần secret key
  const hash = CryptoJS.SHA256(jsonBody).toString(CryptoJS.enc.Hex);

  return hash;
}

export function limitDescription(description: any, maxLength: any) {
  if (description.length <= maxLength) {
    return description;
  } else {
    return description.slice(0, maxLength) + "...";
  }
}

export const calculateProgress = (data: any) => {
  return data.map((course: any) => {
    let totalSubLessons = 0;
    let completedSubLessons = 0;

    course.lesson_progress.forEach((lesson: any) => {
      lesson.sub_lesson.forEach((subLesson: any) => {
        totalSubLessons++;
        if (
          (subLesson.completed == true && subLesson.result == true) ||
          (subLesson.completed === true && subLesson.result === false)
        ) {
          completedSubLessons++;
        }
      });
    });

    const progressPercentage = (completedSubLessons / totalSubLessons) * 100;
    return Math.ceil(progressPercentage);
  });
};
export function convertToVND(amount: any) {
  // Chuyển đổi số tiền thành chuỗi và thêm dấu phân tách hàng nghìn
  let formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Thêm ký hiệu tiền tệ "₫" vào cuối
  return formattedAmount + " ₫";
}

export function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng được tính từ 0-11, cần cộng thêm 1
  const year = today.getFullYear();

  return `Hà Nội,${day}/${month}/${year}`;
}

export function roundToOneDecimal(num: any) {
  return parseFloat(num.toFixed(1));
}
export const getStartOfMonth = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);

  // Lấy ngày, tháng, năm cụ thể
  const day = startOfMonth.getDate();
  const month = startOfMonth.getMonth() + 1; // Tháng bắt đầu từ 0, cần phải cộng thêm 1
  const year = startOfMonth.getFullYear();

  // Chuyển định dạng ngày, tháng, năm thành chuỗi
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export function calculateTimeAgoString(
  pastDate: Date,
  currentDate: Date = new Date()
): string {
  const timeDifference = currentDate.getTime() - pastDate.getTime();

  // Chuyển milliseconds thành các đơn vị thời gian
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} năm trước`;
  } else if (months > 0) {
    return `${months} tháng trước`;
  } else if (days > 0) {
    return `${days} ngày trước`;
  } else if (hours > 0) {
    return `${hours} giờ trước`;
  } else if (minutes > 0) {
    return `${minutes} phút trước`;
  } else {
    return `${seconds} giây trước`;
  }
}
