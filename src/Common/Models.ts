interface IBook {
    id: string;
    volumeInfo: IBookInfo;
}

interface IBookInfo {
    title: string;
    imageLinks: IImageLinks;
    authors: string[];
    categories: string[];
    description: string;
}

interface IImageLinks {
    small: string;
    smallThumbnail: string;
    thumbnail: string;
}
