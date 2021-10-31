import { v4 as uuidv4 } from 'uuid';

const LOCALSTORAGE_GUID_KEY = "client-guid"

export function getGuid(): string {
    if (!localStorage.getItem(LOCALSTORAGE_GUID_KEY)) {
        setGuid()
    }
    return <string>localStorage.getItem(LOCALSTORAGE_GUID_KEY)
}

function setGuid() {
    localStorage.setItem(LOCALSTORAGE_GUID_KEY, uuidv4())
}