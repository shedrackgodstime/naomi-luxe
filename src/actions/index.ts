// Server Actions - Main exports
// All actions use "use server" directive

// Admin actions
export {
  createUserAction,
  deleteUserAction,
  getUserByIdAction,
  listUsersAction,
  updateUserRoleAction,
} from "./admin";
// Auth actions
export {
  getCurrentUserAction,
  requestPasswordResetAction,
  signInAction,
  signOutAction,
  signUpAction,
  updatePasswordAction,
  updateProfileAction,
} from "./auth";

// Booking actions
export {
  cancelBookingAction,
  createBookingAction,
  deleteBookingAction,
  getBookingByIdAction,
  getBookingsAction,
  getUserBookingsAction,
  updateBookingStatusAction,
} from "./bookings";
// Gallery actions
export {
  createGalleryItemAction,
  deleteGalleryItemAction,
  getGalleryItemByIdAction,
  getGalleryItemsAction,
  updateGalleryItemAction,
} from "./gallery";
// Homepage actions
export {
  createHomepageContentAction,
  deleteHomepageContentAction,
  getHomepageContentAction,
  getHomepageContentBySectionAction,
  updateHomepageContentAction,
} from "./homepage";
// Notification actions
export {
  archiveNotificationAction,
  deleteNotificationAction,
  getNotificationByIdAction,
  getNotificationPreferencesAction,
  getUnreadNotificationsAction,
  getUserNotificationsAction,
  markAllNotificationsAsReadAction,
  markNotificationAsReadAction,
  updateNotificationPreferencesAction,
} from "./notifications";
// Order actions
export {
  createOrderAction,
  getOrderByIdAction,
  getOrdersAction,
  getOrderWithItemsAction,
  getUserOrdersAction,
  updateOrderStatusAction,
} from "./orders";
// Product actions
export {
  createProductAction,
  deleteProductAction,
  getProductByIdAction,
  getProductsAction,
  getProductsByCategoryAction,
  updateProductAction,
} from "./products";
// Service actions
export {
  createServiceAction,
  deleteServiceAction,
  getServiceByIdAction,
  getServicesAction,
  updateServiceAction,
} from "./services";
// Testimonial actions
export {
  createTestimonialAction,
  deleteTestimonialAction,
  getTestimonialByIdAction,
  getTestimonialsAction,
  updateTestimonialAction,
} from "./testimonials";

// Upload actions
export {
  deleteAvatarAction,
  deleteFileAction,
  deleteMultipleFilesAction,
  uploadAvatarAction,
  uploadGalleryImageAction,
  uploadProductImageAction,
  uploadProductImagesAction,
} from "./upload";
