import dayjs from "dayjs"

export const formatDateAndTime = (date: string) => {
    return dayjs(date).format("MMM DD, YYYY hh:mm A");
}