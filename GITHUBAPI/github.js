class GithuB{

    constructor(){
        this.client_id = '01391cdccebdb41b812f';
        this.client_secret = '5a969bc2c03f292bdeecad4062047d032bab4592';
    }

    async getUser(user){

        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profileData = await profileResponse.json();

        return {
            profile:profileData
        }

    }
}