<script>
    import { collection, query, where, getDocs, getCountFromServer } from "firebase/firestore";
    import {db} from '$lib/firebase/client.js';
    import { jsPDF } from "jspdf";
    import autoTable from 'jspdf-autotable'

    let mergedArr = []
    let countClient = '';
    let countUnread = 0
    let countUnreads = '';
    let countRevenues = '';
    let countRevenue = 0
    let countDues = {}
    let countDue = 0
    let collectibles = 0;
    let collections = 0;
    let arrears = 0;
    let arrearsCollections = 0;
    let arrearsPenaltyCollections = 0;
    let pastDue = 0;
    let pastDueCollections = 0;
    let pastDuePenaltyCollections = 0;
    let totalCollections = 0;
    let dateFrom 
    let dateTo
    let formattedDateFrom 
    let formattedDateTo
    let dateRangeMergedArr = []
    let totalLoanP = 0;
    let totalArrearsP = 0;
    let totalPastDueP = 0;

    const today = new Date();
    const startOfDay = `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${("0" + today.getDate()).slice(-2)}`
    async function dashboardDate(){
        //Total Client
        const docSnap = await getCountFromServer(collection(db, "clientinfo")); 
        countClient = docSnap.data().count;
        //Total Unreads
        const q = query(collection(db, "inquiries"),where("isRead", "==", false));
        const docSnapTwo = await getDocs(q); 
        docSnapTwo.forEach((doc) => {
            countUnreads = docSnapTwo.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            }); 
        });
        if(countUnreads.length == undefined){
            countUnread = 0
        } else{
            countUnread = countUnreads.length
        }
        // Total revenue of the day
        const qthree = query(collection(db, "payments"),where("transactionDate", "==", startOfDay));
        const docSnapThree = await getDocs(qthree); 
        docSnapThree.forEach((doc) => {
            countRevenues = docSnapThree.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            }); 
        });
        if (countRevenues.length != 0) {
            countRevenue = countRevenues.reduce((acc, obj) => acc + (obj.loanPayment + obj.arrearsPayment + obj.pastDuePayment), 0)
        };
        //Total Unreads
        const qfour = query(collection(db, "loanprocess"),where("status", "==", "Past Due"));
        const docSnapFour = await getDocs(qfour); 
        docSnapFour.forEach((doc) => {
            countDues = docSnapFour.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            }); 
        });
        if(countDues.length == undefined){
            countDue = 0
        } else{
            countDue = countDues.length
        }
    }

    dashboardDate();

    async function dailyCollectionReport(){

        let clients
        let loans
        let payments
        const q = query(collection(db, "clientinfo"),where("status", "==", "Ongoing"));
        const docSnap = await getDocs(q); 
        docSnap.forEach((doc) => {
            clients = docSnap.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            }); 
        });
        const qOne = query(collection(db, "loanprocess"),where("status", "==", "Ongoing"));
        const docSnapOne = await getDocs(qOne); 
        docSnapOne.forEach((doc) => {
            loans = docSnapOne.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            }); 
        });
        const qTwo = query(collection(db, "payments"),where("transactionDate", "==", startOfDay));
        const docSnapTwo = await getDocs(qTwo); 
        docSnapTwo.forEach((doc) => {
            payments = docSnapTwo.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            }); 
        });

        if (payments != undefined) {
            collectibles =  loans.reduce((acc, obj) => acc + obj.dailyPayment, 0)
            collections = payments.reduce((acc, obj) => acc + obj.loanPayment, 0)
            arrears = loans.reduce((acc, obj) => acc + obj.arrearsPenalty, 0)
            arrearsCollections = payments.reduce((acc, obj) => acc + obj.arrearsPayment, 0)
            arrearsPenaltyCollections = payments.reduce((acc, obj) => acc + obj.arrearsPayment, 0) * 0.05
            pastDue = loans.reduce((acc, obj) => acc + obj.pastDue, 0)
            pastDueCollections = payments.reduce((acc, obj) => acc + obj.pastDuePayment, 0)
            pastDuePenaltyCollections = payments.reduce((acc, obj) => acc + obj.arrearsPayment, 0) * 0.05
            totalCollections = collections + arrearsCollections + pastDueCollections
    
            mergedArr = clients.map(item1 => {
                const item2 = loans.find(item2 => item2.owner === item1.id);
                const item3 = payments.find(item3 => item3.owner === item1.id);
                return { ...item1, ...item2, ...item3 };
            });
        }
    }

    dailyCollectionReport();

    async function generatePDF() {
        const dailyReport = new jsPDF();
        
        if(collectibles != 0 ){
            const collectiblesString = collectibles.toString();
            const collectionsString = collections.toString();
            const arrearsString = arrears.toString();
            const arrCollectionsString = arrearsCollections.toString();
            const arrPnlCollectionsString = arrearsPenaltyCollections.toString();
            const pastDueString = pastDue.toString();
            const pastDueCollectionsString = pastDueCollections.toString();
            const pastDuePnlCollectionsString = pastDuePenaltyCollections.toString();
            const totalCollectionsString = totalCollections.toString();

            dailyReport.text('JEMPOWERS CREDIT COPORATION', 56, 22);
            dailyReport.text('DAILY COLLECTIONS REPORT', 62, 37);
            dailyReport.text(startOfDay, 89, 45);
            dailyReport.setFontSize(11);
            dailyReport.text('San Pedro City, Laguna', 83, 27);
            dailyReport.addImage("/summary.png", "PNG", 0, 50, 212, 65);
            dailyReport.text(collectiblesString, 22, 70 );
            dailyReport.text(collectionsString, 45, 70 );
            dailyReport.text(arrearsString, 79, 70 );
            dailyReport.text(arrCollectionsString, 110, 70 );
            dailyReport.text(arrPnlCollectionsString, 95, 85 );
            dailyReport.text(pastDueString, 145, 70 );
            dailyReport.text(pastDueCollectionsString, 175, 70 );
            dailyReport.text(pastDuePnlCollectionsString, 165, 85 );
            dailyReport.text(totalCollectionsString, 158, 99 );
            dailyReport.autoTable({
                theme: 'grid',
                margin: {top: 125, left:3}, 
                tableWidth: 205,
                headStyles: {fontSize: 6},
                style:{fontSize: 5, item:'center'},
                html: '#daily_collection_report',
            });
            window.open(dailyReport.output('bloburl'));
            
        }

        dailyReport.save(`DailyReport ${startOfDay}.pdf`);
    }


    async function searchReports (){
        let dateFromInput = new Date(dateFrom);
        dateFromInput.setHours(0, 0, 0, 0);
        formattedDateFrom = `${dateFromInput.getFullYear()}-${("0" + (dateFromInput.getMonth() + 1)).slice(-2)}-${("0" + dateFromInput.getDate()).slice(-2)}`;

        let dateToInput = new Date(dateTo);
        dateToInput.setHours(0, 0, 0, 0);
        formattedDateTo = `${dateToInput.getFullYear()}-${("0" + (dateToInput.getMonth() + 1)).slice(-2)}-${("0" + dateToInput.getDate()).slice(-2)}`;

        let clients
        // let loans
        let payments
        const q = query(collection(db, "clientinfo"),where("status", "!=", "No Loan"));
        const docSnap = await getDocs(q); 
        docSnap.forEach((doc) => {
            clients = docSnap.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            }); 
        });

        const qTwo = query(collection(db, "payments"), where("transactionDate", ">=", formattedDateFrom), where("transactionDate", "<=", formattedDateTo));
        const docSnapTwo = await getDocs(qTwo); 
        docSnapTwo.forEach((doc) => {
            payments = docSnapTwo.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            }); 
        });

        if (payments != undefined) {
            const loanPResultArr = [];
            const sumsLoanP = payments.reduce((acc, curr) => {
                if (!acc[curr.owner]) {
                    acc[curr.owner] = { owner: curr.owner, loanPayment: 0 };
                }
                acc[curr.owner].loanPayment += curr.loanPayment;
                return acc;
            }, {});
            for (let key in sumsLoanP) {
                loanPResultArr.push(sumsLoanP[key]);
            }

            const arrearsPResultArr = [];
            const sumsArrearsP = payments.reduce((acc, curr) => {
                if (!acc[curr.owner]) {
                    acc[curr.owner] = { owner: curr.owner, arrearsPayment: 0 };
                }
                acc[curr.owner].arrearsPayment += curr.arrearsPayment;
                return acc;
            }, {});
            for (let key in sumsArrearsP) {
                arrearsPResultArr.push(sumsArrearsP[key]);
            }

            const pastDuePResultArr = [];
            const sumspastDueP = payments.reduce((acc, curr) => {
                if (!acc[curr.owner]) {
                    acc[curr.owner] = { owner: curr.owner, pastDuePayment: 0 };
                }
                acc[curr.owner].pastDuePayment += curr.pastDuePayment;
                return acc;
            }, {});
            for (let key in sumspastDueP) {
                pastDuePResultArr.push(sumspastDueP[key]);
            }
            
            dateRangeMergedArr = clients.map(item1 => {
                const item2 = loanPResultArr.find(item2 => item2.owner === item1.id);
                const item3 = arrearsPResultArr.find(item3 => item3.owner === item1.id);
                const item4 = pastDuePResultArr.find(item4 => item4.owner === item1.id);
                return { ...item1, ...item2, ...item3, ...item4 };
            });

        
            const sumsTotalLoanP = dateRangeMergedArr.reduce((acc, curr) => {
            if (curr.loanPayment) {
                acc[curr.id] = (acc[curr.id] || 0) + curr.loanPayment;
            }
            return acc;
            }, {});
            for (let key in sumsTotalLoanP) {
                totalLoanP += sumsTotalLoanP[key];
            }

            const sumsTotalArrearsP = dateRangeMergedArr.reduce((acc, curr) => {
            if (curr.arrearsPayment) {
                acc[curr.id] = (acc[curr.id] || 0) + curr.arrearsPayment;
            }
            return acc;
            }, {});
            for (let key in sumsTotalArrearsP) {
                totalArrearsP += sumsTotalArrearsP[key];
            }

            const sumsTotalPastDueP = dateRangeMergedArr.reduce((acc, curr) => {
            if (curr.pastDuePaymentt) {
                acc[curr.id] = (acc[curr.id] || 0) + curr.pastDuePaymentt;
            }
            return acc;
            }, {});
            for (let key in sumsTotalPastDueP) {
                totalPastDueP += sumsTotalPastDueP[key];
            }
        }
    }

    async function generateIncomeReport(){
        const incomeReport = new jsPDF();
        await searchReports();
        incomeReport.text('JEMPOWERS CREDIT COPORATION', 56, 22);
        incomeReport.text('INCOME REPORT', 82, 37);
        incomeReport.text(dateFrom+ ' - ' + dateTo, 72, 45);
        incomeReport.setFontSize(11);
        incomeReport.text('San Pedro City, Laguna', 83, 27);
        incomeReport.autoTable({
            theme: 'grid',
            margin: {top: 50, left:3}, 
            tableWidth: 205,
            headStyles: {fontSize: 6},
            style:{fontSize: 5, item:'center'},
            html: '#date_range_income_report',
        });
            window.open(incomeReport.output('bloburl'));
            

    }
</script>

<svelte:head>
	<title>JEM | Admin Dashboard</title>
</svelte:head>


    
    <section class="flex flex-col gap-6 h-screen max-xl:h-full p-4 shadow-lg rounded-md overflow-y-scroll">
        
        <div class="p-2">
            <h1 class="font-bold text-xl" >Admin Dashboard</h1>
        </div>
        <hr/>
        <h2 class="font-bold text-xl pl-2">General Report</h2>

        <section class="flex w-full justify-center items-center">
            <div class="flex w-full max-xl:w-fit items-center justify-center gap-7 max-lg:gap-3 p-3 max-xl:grid max-xl:grid-cols-2 max-lg:grid max-lg:grid-cols-2">

                <div class=" flex flex-col w-96 max-lg:w-48 max-xl:w-64 bg-gray-200 h-32 max-lg:h-20 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg p-5 max-lg:p-2 hover:text-green-700">
                    <span class=" font-semibold text-xl max-lg:text-sm ">Total client</span>
                        <div class=" flex h-fit w-full justify-center max-lg:gap-4 items-center">
                            {#if countClient.length != 0}
                                <div class=" flex flex-1 justify-center text-5xl max-lg:text-4xl font-semibold"> <p>{countClient}</p> </div>
                            {/if}
                            <div class="flex flex-1 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 max-lg:w-10 max-lg:h-10">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                            </div>
                        </div>  
                </div>

                <div class=" flex flex-col w-96 max-lg:w-48 max-xl:w-64 bg-gray-200 h-32 max-lg:h-20 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg p-5 max-lg:p-2 hover:text-green-700">
                        <span class=" font-semibold text-xl max-lg:text-sm ">Total Revenue Today</span>
                    <div class=" flex h-fit w-full justify-center max-lg:gap-4 items-center">
                        <div class=" flex flex-1 justify-center text-5xl max-lg:text-3xl font-semibold"> <p>{countRevenue.toFixed(2)}</p> </div>
                            <div class="flex flex-1 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 max-lg:w-10 max-lg:h-10">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                </svg>    
                            </div>
                    </div>  
                </div>

                <div class=" flex flex-col w-96 max-lg:w-48 max-xl:w-64 bg-gray-200 h-32 max-lg:h-20 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg p-5 max-lg:p-2 hover:text-green-700">
                    <span class=" font-semibold text-xl max-lg:text-sm ">Unread Inquiries</span>
                    <div class=" flex h-fit w-full justify-center max-lg:gap-4 items-center">
                        <div class=" flex flex-1 justify-center text-5xl max-lg:text-4xl font-semibold"> 
                            <p>{countUnread}</p> 
                        </div>
                        <div class="flex flex-1 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 max-lg:w-10 max-lg:h-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                            </svg>
                        </div>
                    </div>  
                </div>
                <div class=" flex flex-col w-96 max-lg:w-48 max-xl:w-64 bg-gray-200 h-32 max-lg:h-20 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg p-5 max-lg:p-2 hover:text-green-700">
                    <span class=" font-semibold text-xl max-lg:text-sm ">Past Dues</span>
                    <div class=" flex h-fit w-full justify-center max-lg:gap-4 items-center">
                        <div class=" flex flex-1 justify-center text-5xl max-lg:text-4xl font-semibold">
                            <p>{countDue}</p> 
                        </div>
                        <div class="flex flex-1 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 max-lg:w-10 max-lg:h-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>                          
                        </div>
                    </div> 
                </div>
            </div>
        </section>

        <hr/>
        <section class="w-full ">
            <div class="flex justify-center w-full">
                <div class=" w-fit collapse collapse-arrow rounded-md justify-center">
                    <input class="w-full " type="checkbox" /> 
                    <div class="flex items-center collapse-title ">
                        <span class=" text-lg font-semibold justify-center">Generate Income Report by Date Range</span>
                    </div>
                    <div class="flex flex-col px-2 py-0 collapse-content" style="padding-bottom: 0px"> 
                            <div class="flex gap-10">
                                <div>
                                    <label for="" class="font-medium">Date From:</label>
                                    <input type="date" bind:value={dateFrom} class="text-sm rounded-lg w-36">
                                </div> 
                                <div>
                                    <label for="" class="font-medium">Date To:</label>
                                    <input type="date" bind:value={dateTo} class="text-sm rounded-lg w-36">
                                </div> 
                            </div>
                            <button on:click={searchReports,generateIncomeReport} disabled={!dateFrom || !dateTo} class="btn border-transparent bg-green-600 mt-4 font-semibold">Generate PDF Report</button>
                    </div>
                    
                </div>
            </div>
        </section>
        <hr/>

            <div class="flex w-full justify-center">
                <button on:click={generatePDF} class={mergedArr.length == 0 ? 'btn-link opacity-30 py-1 px-2 font-semibold' : 'btn-link py-1 px-2 font-semibold'} disabled={mergedArr.length == 0}>Download Daily Collection Report</button>
            </div>
        <section class="w-full h-full overflow-x-scroll overflow-y-scroll">
            {#if mergedArr.length != 0}
            <table class="table table-compact w-full text-sm" id='daily_collection_report'>
                <thead>
                    <tr>
                        <td class="px-6">NAME</td>
                        <th scope="col" class="px-6">REF</th>
                        <th scope="col" class="px-6">DUE DATE</th> 
                        <th scope="col" class="px-6">BALANCE</th> 
                        <th scope="col" class="px-6">D.I.</th> 
                        <th scope="col" class="px-6">PR#</th> 
                        <th scope="col" class="px-6">LP</th>
                        <th scope="col" class="px-6">ARR PNL</th>
                        <th scope="col" class="px-6">ARR PY</th>
                        <th scope="col" class="px-6">PASTDUE PNL</th> 
                        <th scope="col" class="px-6">PASTDUE PY</th> 
                    </tr>
                </thead>
                {#each mergedArr as data}
                    {#if data.loanPayment}
                        <tr>
                            <td class="px-6">
                                {data.lastname},{data.firstname}
                            </td>
                            <td class="px-6">
                                {data.loanNumber}
                            </td>
                            <td class="px-6">
                                {data.formattedDueDate}
                            </td>
                            <td class="px-6">
                                {data.balance}
                            </td>
                            <td class="px-6">
                                {data.dailyPayment}
                            </td>
                            <td class="px-6">
                                {data.prNumber}
                            </td>
                            <td class="px-6">
                                {data.loanPayment}
                            </td>
                            <td class="px-6">
                                {data.arrearsPenalty}
                            </td>
                            <td class="px-6">
                                {data.arrearsPayment}
                            </td>
                            <td class="px-6">
                                {data.pastDue}
                            </td>
                            <td class="px-6">
                                {data.pastDuePayment}
                            </td>
                        </tr>
                    {/if}
                {/each}
            </table>
            {/if}
        </section>
        {#if dateRangeMergedArr.length != 0}
        <table class="table table-compact w-full text-sm hidden" id='date_range_income_report'>
            <thead>
                <tr>
                    <th scope="col" class="px-6">NAME</th>
                    <th scope="col" class="px-6">TOTAL LP</th>
                    <th scope="col" class="px-6">TOTALARR PY</th>
                    <th scope="col" class="px-6">TOTALPASTDUE PY</th> 
                </tr>
            </thead>
            {#each dateRangeMergedArr as data}
                {#if data.loanPayment}
                    <tr>
                        <td class="px-6">
                            {data.lastname},{data.firstname}
                        </td>
                        <td class="px-6">
                            {data.loanPayment}
                        </td>
                        <td class="px-6">
                            {data.arrearsPayment}
                        </td>
                        <td class="px-6">
                            {data.pastDuePayment}
                        </td>
                    </tr>
                    
                {/if}
            {/each}
            <tr>
                <td class="px-6">
                    <p>Total</p>
                </td>
                <td class="px-6">
                    {totalLoanP}
                </td>
                <td class="px-6">
                    {totalArrearsP}
                </td>
                <td class="px-6">
                    {totalPastDueP}
                </td>
            </tr>
        </table>
        {/if}
    </section>