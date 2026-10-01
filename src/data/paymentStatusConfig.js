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
    bannerBg: "var(--c-e9f8f0)",
    bannerBorder: "var(--c-c7ecd8)",
    iconBg: "var(--c-e4f8ee)",
    iconColor: "var(--c-22b573)",
    title: "To'lov holati: faol",
  },
  [PAYMENT_STATUS.DUE_SOON]: {
    label: "Kutilmoqda",
    icon: Clock,
    cardColor: "orange",
    bannerBg: "var(--c-fef9f0)",
    bannerBorder: "var(--c-fbe4bc)",
    iconBg: "var(--c-fef3e3)",
    iconColor: "var(--c-f5a623)",
    title: "To'lov muddati yaqinlashmoqda",
  },
  [PAYMENT_STATUS.OVERDUE]: {
    label: "Muddati o'tgan",
    icon: AlertTriangle,
    cardColor: "red",
    bannerBg: "var(--c-fdecec)",
    bannerBorder: "var(--c-f6c9c9)",
    iconBg: "var(--c-fdecec)",
    iconColor: "var(--c-d64545)",
    title: "To'lov muddati o'tib ketgan",
  },
};