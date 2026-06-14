import { File, Paths } from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

// ------ Constants
const ALL_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface Expense {
  type: "water" | "electricity";
  monthId: number;
  bill: number;
}

export async function exportCSV(
  electricityExpenses: Expense[],
  waterExpenses: Expense[],
) {
  // File Creation
  const file = new File(Paths.document, "Expenses.pdf");

  if (!file.exists) {
    file.create();
  }

  file.write("Expenses");

  // CSV content Creation
  const allValues = [...electricityExpenses, ...waterExpenses];
  const headers = ["Type", "Month", "Expense"];

  const waterRows = waterExpenses
    .map(
      (expense) => `
    <tr>
      <td>${ALL_MONTHS[expense.monthId]}</td>
      <td>${expense.bill}</td>
    </tr>
    `,
    )
    .join("");

  const electricityRows = electricityExpenses
    .map(
      (expense) => `
    <tr>
      <td>${ALL_MONTHS[expense.monthId]}</td>
      <td>${expense.bill}</td>
    </tr>
    `,
    )
    .join("");

  const waterTotal = waterExpenses.reduce(
    (sum, expense) => sum + expense.bill,
    0,
  );
  const electrictyTotal = electricityExpenses.reduce(
    (sum, expense) => sum + expense.bill,
    0,
  );

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 10px;
            color: #333;
          }

          @page {
            margin: 40px;
          }

          .page {
            padding-top: 20px;
            box-sizing:border-box
          }


          h1 {
            text-align: center;
            color: #2563eb;
            margin-bottom: 24px;
            margin-top: 16px;
          }

          h2 {
            margin-bottom: 12px;
          }

          .summary {
            margin-bottom: 20px;
            font-size: 16px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            padding: 10px;
            border: 1px solid #ddd;
            border-top: 1px solid #ddd;
          }

          th {
            color: #4272d8
          }

          /* remove LEFT outer border */
          th:first-child,
          td:first-child {
            border-left: none;
          }

          /* remove RIGHT outer border */
          th:last-child,
          td:last-child {
            border-right: none;
          }

          /* optional: remove top border of first row */
          thead tr th {
            border-top: none;
          }

          /* optional: remove bottom border of last row */
          tbody tr:last-child td {
            border-bottom: none;
          }

          .total {
            margin-top: 20px;
            text-align: right;
            font-size: 18px;
            font-weight: bold;
          }

          .break-before {
            page-break-before: always;
            break-before: page;
          }
        </style>
      </head>

      <body>
        
        <div class="page">
          <h1>Expense Report</h1>

          <div class="summary">
            Generated on: ${new Date().toLocaleDateString()}
            
          </div>
          <h2>Electricity</h2>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Bill ($)</th>
              </tr>
            </thead>

            <tbody>
              ${electricityRows}
            </tbody>
          </table>

          <div class="total">
            Total: ${electrictyTotal.toFixed(2)}
          </div>
        </div>

        <div class="page break-before">
          <h1>Expense Report</h1>

          <div class="summary">
            Generated on: ${new Date().toLocaleDateString()}
            
          </div>
          <h2>Water</h2>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Bill ($)</th>
              </tr>
            </thead>

            <tbody>
              ${waterRows}
            </tbody>
          </table>

          <div class="total">
            Total: ${waterTotal.toFixed(2)}
          </div>
        </div>
      </body>
    </html>
  `;

  const { uri: tempUri } = await Print.printToFileAsync({
    html,
  });

  const tempFile = new File(tempUri);

  // copy content manually
  file.write(tempFile.bytesSync());

  await Sharing.shareAsync(file.uri, {
    mimeType: "application/pdf",
    dialogTitle: "Export Expense Report",
  });

  //   // Write File
  //   file.write(csvContent);

  //   await Sharing.shareAsync(file.uri, {
  //     mimeType: "text/csv",
  //     dialogTitle: "Export Expenses",
  //   });
}
