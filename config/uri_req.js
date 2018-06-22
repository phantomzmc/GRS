var url = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/"
export default
    [
        {
            session_token: "http://api.shutterrunning2014.com/api/v2/user/session",
            uspGetCourseLists: url + "Main.uspGetCourseLists"
        },
        {
            uspGetEventList: url + "Main.uspGetEventList()"
        },
        {
            uspCheckUsername: url + "Main.uspCheckUsername"
        }

    ]