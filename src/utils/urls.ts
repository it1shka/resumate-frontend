

export function extractDomain(url : string){
    const cleanedLink = url
        .replace("https://", '')
        .replace("http://", '')
        .replace("www.", '');
    const domain = cleanedLink.split("/")[0];
    return domain; 
}