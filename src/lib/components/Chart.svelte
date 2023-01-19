<script>
    import {onMount} from "svelte";
    function createChart(){
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
                type: 'bar',
                data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets: [{
                    label: 'Number of Clients',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });
    }        
    onMount(createChart);
</script>