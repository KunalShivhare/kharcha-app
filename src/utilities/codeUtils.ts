// import moment from 'moment';
// import { Alert, Linking, Share } from 'react-native';
// import Config from 'react-native-config';
// import { ErrorMessage } from '../constants';
// import { GOOGLE_ADDRESS_KEY, JOURNEY_SERVICE_MODE } from '../constants/generic';
// import { AddressComponent } from '../data/models/GoogleMapApiModal';
// import locale from '../locales';
// import { getConfigUpdatedTime } from './reducerUtils';

// const { ENV } = Config;

export function debounce<T extends unknown>(
  func: (param?: any) => any,
  wait = 0,
  immediate = false
): (param?: T) => void {
  let timeout: NodeJS.Timeout | null;
  function debounceHandler() {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  }
  debounceHandler.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };
  return debounceHandler;
}

// export function throttle<T extends unknown>(
//   func: (param: T) => void,
//   wait = 0
// ): (param?: T) => void {
//   let timeout: NodeJS.Timeout | null;
//   let lastArgs: T | null;
//   let lastContext: any;

//   function throttleHandler() {
//     const context = this;
//     const args = arguments;

//     if (!timeout) {
//       func.apply(context, args); // Call the function immediately for the first invocation
//     }

//     if (!timeout || (timeout && !lastArgs)) {
//       lastArgs = args;
//       lastContext = context;
//       timeout = setTimeout(() => {
//         timeout = null;
//         if (lastArgs) {
//           func.apply(lastContext, lastArgs);
//           lastArgs = null;
//           lastContext = null;
//         }
//       }, wait);
//     }
//   }

//   return throttleHandler;
// }

// export const isEmptyObject = (obj: object | null | undefined) =>
//   !(obj && Object.keys(obj).length > 0);
// export const isProduction = () => !__DEV__ && ENV === 'production';

// export const wait = async (ms = 1500) =>
//   new Promise((resolve) => setTimeout(() => resolve(true), ms));

// export const getFormatedDuration = (value: number = 0, unit: string) => {
//   return unit === JOURNEY_SERVICE_MODE.PAY_PER_MINUTE
//     ? `Pay-per-minutes`
//     : `${value} ${
//         value <= 1 ? (unit === 'HOURS' ? 'hour' : 'minute') : unit === 'HOURS' ? 'hours' : 'minutes'
//       }`;
// };

// export function convertMinutesToHoursAndMinutes(minutes: number) {
//   if (isNaN(minutes) || minutes < 0) {
//     return 'Invalid input';
//   }

//   var hours = Math.floor(minutes / 60);
//   var remainingMinutes = minutes % 60;

//   if (hours === 0) {
//     return `${remainingMinutes} min`;
//   } else if (remainingMinutes === 0) {
//     return `${hours} hrs`;
//   } else {
//     return `${hours} hrs ${remainingMinutes} min`;
//   }
// }
// export const getFormattedDate = (time: Date) => {
//   return moment(time ?? new Date()).format('DD MMM');
// };

// export const getFormatedTime = (time: Date) => {
//   return moment(time ?? new Date()).format('DD MMMM, hh:mm A');
// };
// export const getFormatedTime2 = (time: Date) => {
//   return moment(time ?? new Date()).format('ddd, MMM DD, hh:mm A');
// };

// export const getFormatedTime3 = (time: Date) => {
//   return moment(time ?? new Date()).format('DD/MM/YYYY');
// };

// export const getFormatedTime4 = (time: Date | string) => {
//   return moment(time ?? new Date()).format('hh:mm A');
// };

// export const getNameInitial = (name?: string) => {
//   const initials = (name ?? 'Add Name')
//     .trim()
//     .split(/\s+/)
//     .filter((part) => part)
//     .map((part) => part[0].toUpperCase())
//     .join('');

//   return initials.slice(0, 2);
// };

// export const getFormattedTimeDifference = (startDate: Date, endDate: Date) => {
//   const startTime = moment(startDate);
//   const endTime = moment(endDate);

//   const duration = moment.duration(endTime.diff(startTime));

//   const formattedDuration = [];

//   if (duration.months() > 0) {
//     formattedDuration.push(`${duration.months()} ${duration.months() > 1 ? 'months' : 'month'}`);
//   }
//   if (duration.weeks() > 0) {
//     formattedDuration.push(`${duration.weeks()} ${duration.weeks() > 1 ? 'weeks' : 'week'}`);
//   }
//   if (duration.days() > 0) {
//     formattedDuration.push(`${duration.days()} ${duration.days() > 1 ? 'days' : 'day'}`);
//   }
//   if (duration.hours() > 0) {
//     formattedDuration.push(`${duration.hours()} ${duration.hours() > 1 ? 'hrs' : 'hr'}`);
//   }
//   if (duration.minutes() > 0) {
//     formattedDuration.push(`${duration.minutes()} ${duration.minutes() > 1 ? 'mins' : 'min'}`);
//   }

//   const result = formattedDuration?.slice(0, 3)?.join(', ');
//   return result;
// };

// export const LinkingUrl = (url: string) => {
//   Linking.canOpenURL(url)
//     .then((supported) => {
//       if (!supported) {
//         Alert.alert(ErrorMessage.somethingWentWrong);
//       } else {
//         return Linking.openURL(url);
//       }
//     })
//     .catch((err) => console.log(err));
// };

// export const openDeviceShare = async (message: string) => {
//   try {
//     const result = await Share.share({
//       message,
//     });
//     if (result.action === Share.sharedAction) {
//       if (result.activityType) {
//         // shared with activity type of result.activityType
//       } else {
//         // shared
//       }
//     } else if (result.action === Share.dismissedAction) {
//       // dismissed
//     }
//   } catch (error: any) {
//     Alert.alert(error?.message ?? '');
//   }
// };

// export const getStateFromAdress = (addressArray: AddressComponent[]): string => {
//   const stateObject = addressArray?.find((addressComponent) =>
//     addressComponent?.types?.includes?.(GOOGLE_ADDRESS_KEY.state)
//   );

//   return stateObject?.long_name ? stateObject.long_name : locale.NA;
// };

// export const getCityFromAddress = (addressArray: AddressComponent[]): string => {
//   const stateObject = addressArray?.find(
//     (addressComponent) =>
//       addressComponent?.types?.includes?.(GOOGLE_ADDRESS_KEY.locality) ??
//       addressComponent?.types?.includes?.(GOOGLE_ADDRESS_KEY.city)
//   );

//   return stateObject?.long_name ? stateObject.long_name : locale.NA;
// };

// export const getTimeDifferenceInMinutes = (startDate: Date, endDate: Date) => {
//   const date1 = new Date(startDate);
//   const date2 = endDate ? endDate : new Date();
//   const differenceMs = date1.getTime() - date2.getTime();
//   const differenceMinutes = Math.round(differenceMs / (1000 * 60));
//   return differenceMinutes;
// };

// export const getTimeDifferenceInDays = (startDate: Date, endDate: Date) => {
//   const date1 = new Date(startDate);
//   const date2 = endDate ? endDate : new Date();
//   const differenceMs = date1.getTime() - date2.getTime();
//   const differenceDays = Math.round(differenceMs / (1000 * 60 * 60 * 24));
//   return differenceDays;
// };

// export const isSameObject = (obj1: any, obj2: any) => JSON.stringify(obj1) === JSON.stringify(obj2);

// export const getGradientArrayFromString = (colorString: string) => {
//   return colorString?.split?.(',')?.map((color) => color?.trim());
// };

// export const compareDates = (date1: string | Date, date2: string | Date) => {
//   const formattedDate1 = moment(date1).format('YYYY-MM-DD');
//   const formattedDate2 = moment(date2).format('YYYY-MM-DD');

//   if (formattedDate1 === formattedDate2) {
//     return 0; // Dates are the same
//   } else if (moment(formattedDate1).isAfter(formattedDate2)) {
//     return 1; // date1 is after date2
//   } else {
//     return -1; // date1 is before date2
//   }
// };

// export function setExpireBy(days: number) {
//   return new Date().getTime() + (days || 1) * (1000 * 60 * 60 * 24);
// }
// export function isExpired(time: number) {
//   const configUpdatedTime = getConfigUpdatedTime();
//   const lastUpdatedTime = time - 1000 * 60 * 60 * 24;
//   return (configUpdatedTime && lastUpdatedTime < configUpdatedTime) || time < new Date().getTime();
// }

// export const getCurrentDateDiff = (date: string) => {
//   return (new Date(date).getTime() - new Date().getTime()) / (1000 * 24 * 60 * 60);
// };
