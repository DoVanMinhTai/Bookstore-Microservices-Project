package com.adc.order.utils;

public final class Constants {

    public final class ErrorCode {
        private ErrorCode() {

        }
        public static final String CHECKOUT_NOT_FOUND = "CHECKOUT_NOT_FOUND";
    }
    public final class MessageCode {
        private MessageCode() {

        }
        public static final String CREATE_CHECKOUT = "Create checkout {} by user {}";
        public static final String UPDATE_CHECKOUT_PAYMENT = "Update checkout {} PAYMENT from {} to {}";
    }
}
