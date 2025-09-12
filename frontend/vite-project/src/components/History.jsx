import Button from "./Button";

export default function History(props) {

    const onBack = props.onBack;

    return (
        <main className="history-main">
            <h2>History</h2>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Numbers</th>
                    <th>Delete</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>9/5/25</td>
                    <td>6 2 4 5 9 12</td>
                    <td>delete</td>
                </tr>
                <tr>
                    <td>9/5/25</td>
                    <td>6 2 4 5 9 12</td>
                    <td>delete</td>
                </tr>
                <tr>
                    <td>9/5/25</td>
                    <td>6 2 4 5 9 12</td>
                    <td>delete</td>
                </tr>
                </tbody>
            </table>
        <div className="history-back">
            <Button text="Back" onClick={onBack} />
        </div>
        </main>
    )
}