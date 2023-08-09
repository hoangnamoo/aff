function hideStringEmail(emailStr, numberHide) {
    if (emailStr.length <= numberHide) {
        return '*'.repeat(emailStr.length); // Replace all characters with '*'
    }
    return '*'.repeat(numberHide) + emailStr.substring(numberHide);
}

export default hideStringEmail;
