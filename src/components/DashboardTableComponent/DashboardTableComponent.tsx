import DashboardService from "../../services/DashboardService";
import React, { useState } from 'react';

interface FlashCard {
    flashCardID: number;
    flashCardCategory: string;
    flashCardQuestion: string;
    flashCardAnswer: string;
    createdDate: string;
  }

async function DashboardTableComponent({ dashboardService }: { dashboardService: DashboardService }) {

    // const [rows, setRows] = useState<TableRow[]>([
    //     { flashCardID: 1, flashCardCategory: 'Category 1', flashCardQuestion: 'Question 1', flashCardAnswer: 'Answer 1', createdDate: new Date() },
    // ]);
    const [rows, setRows] = useState<FlashCard[]>([]);

    const addRow = () => {
        // const newRow: TableRow = {
        //     flashCardID: rows.flashCardID,
        //     flashCardCategory: '',
        //     flashCardQuestion: '',
        //     flashCardAnswer: "",
        //     createdDate: undefined
        // };
        // setRows([...rows, newRow]);
    };

    async function getUserID() {
        console.log("calling getUserID");
        try {
            const response = await dashboardService.getUserID("");
            console.log(response);
            if (response.status === 200) {
                console.log('Load successful.');
                if(response.data.userID){
                    console.log("UserID " + response.data.userID);
                    return response.data.userID;
                }
            } else {
                console.error('load failed:', response.status, response.statusText);
                alert('Load failed. Please try again.');
            }
        } catch (error) {
        console.error("Error submitting user data", error);
        }
    }

    async function getUserFlashCards(userID: string) {
        console.log("calling getUserFlashCards");
        try {
            const responseFC = await dashboardService.getUserFlashCards(userID);
            if (responseFC.status === 200) {
                console.log('Load successful.');
                console.log('Populate table with data');

                // TODO: Populate table with data
                responseFC.data.filter((card: { flashCardCategoryStatus: boolean; }) => card.flashCardCategoryStatus === true);

                // Extract flashCardCategoryID values from categories array
                const validCategoryIDs = new Set(categories.map((category: { flashCardCategoryID: any; }) => category.flashCardCategoryID));

                // Filter flashCards based on validCategoryIDs
                const newRows = responseFC.data.filter((flashCard: { flashCardCategory: unknown; }) => validCategoryIDs.has(flashCard.flashCardCategory));
                // setRows([...rows, newRows]);
                return newRows;
            } else {
                console.error('Load failed:', responseFC.status, responseFC.statusText);
                alert('Loading failed. Please try again.');
                return Promise.reject('Loading failed. Please try again.');
            }
        } catch (error) {
          console.error("Error submitting user data", error);
        }
      }

    async function getAllCategory() {
        console.log("calling getAllCategory");
        try {
            const response = await dashboardService.getAllCategory();
            console.log(response);
            if (response.status === 200) {
                // TODO: Filter map data and retrieve only flashCardCategoryStatus = true
                console.log(response.data.filter((card: { flashCardCategoryStatus: boolean; }) => card.flashCardCategoryStatus === true));
                return response.data.filter((card: { flashCardCategoryStatus: boolean; }) => card.flashCardCategoryStatus === true);
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error submitting user data", error);
        }
    }



      // Call
    //   const categories: { flashCardCategoryID: any; }[] = [];
    //   const flashCards: FlashCard[] = [];
      const userID = await getUserID();
      const categories = await getAllCategory();
      const flashCards: FlashCard[] = await getUserFlashCards(userID);

    return (
        <>
            <button className="btn btn-primary mb-3" onClick={addRow}>Add New Row</button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {flashCards.map(flashCard => (
                    <tr key={flashCard.flashCardID}>
                    <td>{flashCard.flashCardCategory}</td>
                    <td>{flashCard.flashCardQuestion}</td>
                    <td>{flashCard.flashCardAnswer}</td>
                    <td>{flashCard.createdDate}</td>
                    <td>
                        <button className="btn btn-primary mr-2">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}   

export default DashboardTableComponent;