var url = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/"
export default
    [
        {
            session_token: "http://api.shutterrunning2014.com/api/v2/user/session",
            uspGetCourseLists: url + "Main.uspGetCourseLists",
            uspGetEventList: url + "Main.uspGetEventList",
            uspCheckUsername: url + "Main.uspCheckUsername",
            uspGetJerseyLists: url + "Main.uspGetJerseyLists",
            uspGetUserProfile: url + "Main.uspGetUserProfile",
            uspGetTambonSuggestion: url + "Main.uspGetTambonSuggestion",
            uspGetAmphoeSuggestion: url + "Main.uspGetAmphoeSuggestion",
            uspGetProvinceSuggestion: url + "Main.uspGetProvinceSuggestion",
            uspCreateAccount: url + "Main.uspCreateAccount",
            uspActivateAccount: url + "Main.uspActivateAccount",
            uspSignIn: url + "Main.uspSignIn",
            uspGetPlaceItemLists: url + "Main.uspGetPlaceItemLists",
            uspAddRegister: url + "Main.uspAddRegister",
            uspApplyPromoCode: url + "Main.uspApplyPromoCode",
            uspSearchFriend: url + "Main.uspSearchFriend",
            uspAddFriendLists: url + "Main.uspAddFriendLists",
            uspCheckRegisterEvent : url + "Main.uspCheckRegisterEvent"
        },
        {
            url_mailgun: "https://api.mailgun.net/v3/mg.guurun.com/messages"
        }
    ]