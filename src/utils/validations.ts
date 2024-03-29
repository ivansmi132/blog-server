import {PostData, PostUpdateData} from "../models/Post";

export function validatePostDataBeforeCreation(postData: PostData) {
    if (!postData.title) {
        throw new Error(`Invalid post data, missing title`);
    }
    if (!postData.content) {
        throw new Error(`Invalid post data, missing content`);
    }
    validatePostData(postData);
}

export function validatePostData(updatedPostData: PostUpdateData) {
    try {
        if (updatedPostData.title) {
            validatePostTitleLength(updatedPostData.title);
            validateStringIsNotWhitespaces(updatedPostData.title);
        }
        if (updatedPostData.content) {
            validatePostContentLength(updatedPostData.content);
            validateStringIsNotWhitespaces(updatedPostData.content);
        }
    } catch (error) {
        throw new Error(`Validation failed with error: ${(error as Error).message}`)
    }
}

function validatePostTitleLength(title: string) {
    if (title.length < 1 || title.length > 100) {
        throw new Error("Title length invalid");
    }
}

function validatePostContentLength(content: string) {
    if (content.length < 1) {
        throw new Error("Content length invalid");
    }
}

function validateStringIsNotWhitespaces(str: string) {
    if (/^\s+$/.test(str)) {
        throw new Error("Invalid input");
    }
}