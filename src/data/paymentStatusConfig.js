import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PAYMENT_STATUS } from "../utils/paymentsStore";

// Har bir to'lov holati uchun StudentPaymentsPage'da ishlatiladigan
// vizual sozlamalar (ikonka, ranglar, sarlavha). navConfig.js dagi
// icon+label massiv uslubiga o'xshab shu yerga chiqarilgan.
export const paymentStatusConfig = {
  [PAYMENT_STATUS.PAID]: {
    label: "Faol",
    icon: CheckCircle2,
    cardColor: "green",
    bannerBg: "#E9F8F0",
    bannerBorder: "#C7ECD8",
    iconBg: "#E4F8EE",
    iconColor: "#22B573",
    title: "To'lov holati: faol",
  },
  [PAYMENT_STATUS.DUE_SOON]: {
    label: "Kutilmoqda",
    icon: Clock,
    cardColor: "orange",
    bannerBg: "#FEF9F0",
    bannerBorder: "#FBE4BC",
    iconBg: "#FEF3E3",
    iconColor: "#F5A623",
    title: "To'lov muddati yaqinlashmoqda",
  },
  [PAYMENT_STATUS.OVERDUE]: {
    label: "Muddati o'tgan",
    icon: AlertTriangle,
    cardColor: "red",
    bannerBg: "#FDECEC",
    bannerBorder: "#F6C9C9",
    iconBg: "#FDECEC",
    iconColor: "#D64545",
    title: "To'lov muddati o'tib ketgan",
  },
};