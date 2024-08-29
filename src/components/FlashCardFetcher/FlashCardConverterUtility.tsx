import IFlashCard from "../../interfaces/IFlashCard";

function FlashCardConverterUtility(input: any): IFlashCard["FlashCard"] {
    return {
        UserID: input["userID"],
        FlashCardID: input["flashCardID"],
        FlashCardQuestion: input["flashCardQuestion"],
        FlashCardAnswer: input["flashCardAnswer"],
        CreatedDate: input["createdDate"],
        FlashCardCategory: input["flashCardCategoryID"],
    }
}

export default FlashCardConverterUtility;