fetch("https://covid19-public.digitalservice.id/analytics/longlat/")

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
            let recap_data = {};
            let recap_data_cirebon = {};
            let total_pdp = 0;
            let total_odp = 0;
            let total_k = 0;

        data.data.forEach(( datum ) => { 
            if( datum.status === "PDP" ) {
                total_pdp += 1;
            }
            if( datum.status === "ODP" ) {
                total_odp += 1;
            }
            if( datum.stage === "Aktif" ) {
                total_k += 1;
            }
            if( datum.kode_kabkot === "3029" ) {
                total_3029 += 1;
            }

            if( !( datum.kode_kabkot in recap_data ) ) {
                recap_data[datum.kode_kabkot] = {
                    "p": {
                        "odp": {
                            "name": datum.kabkot_str,
                            "sex": "Perempuan",
                            "status": "ODP", 
                            "total": 0
                        },
                        "pdp": {
                            "name": datum.kabkot_str,
                            "sex": "Perempuan",
                            "status": "PDP", 
                            "total": 0
                        }
                    },
                    "l": {
                        "odp": {
                            "name": datum.kabkot_str,
                            "sex": "Laki - Laki",
                            "status": "ODP", 
                            "total": 0
                        },
                        "pdp": {
                            "name": datum.kabkot_str,
                            "sex": "Laki - Laki",
                            "status": "PDP", 
                            "total": 0
                        }
                    }
                };
            }

            if( !( datum.kode_kabkot in recap_data ) ) {
                recap_data[datum.kode_kabkot] = {
                    "p": {
                        "odp": {
                            "name": datum.kabkot_str,
                            "sex": "Perempuan",
                            "status": "ODP", 
                            "total": 0
                        },
                        "pdp": {
                            "name": datum.kabkot_str,
                            "sex": "Perempuan",
                            "status": "PDP", 
                            "total": 0
                        }
                    },
                    "l": {
                        "odp": {
                            "name": datum.kabkot_str,
                            "sex": "Laki - Laki",
                            "status": "ODP", 
                            "total": 0
                        },
                        "pdp": {
                            "name": datum.kabkot_str,
                            "sex": "Laki - Laki",
                            "status": "PDP", 
                            "total": 0
                        }
                    }
                }
            };

            if( datum.status === "ODP" && datum.jenis_kelamin_str === "Perempuan" ) {
                recap_data[datum.kode_kabkot]["p"]["odp"].total += 1;
            }
            if( datum.status === "PDP" && datum.jenis_kelamin_str === "Perempuan" ) {
                recap_data[datum.kode_kabkot]["p"]["pdp"].total += 1;
            }
            if( datum.status === "ODP" && datum.jenis_kelamin_str === "Laki-laki" ) {
                recap_data[datum.kode_kabkot]["l"]["odp"].total += 1;
            }
            if( datum.status === "PDP" && datum.jenis_kelamin_str === "Laki-laki" ) {
                recap_data[datum.kode_kabkot]["l"]["pdp"].total += 1;
            }
            if( datum.status === "ODP" && datum.jenis_kelamin_str === "Perempuan" ) {
                recap_data_cirebon[datum.kode_kabkot]["p"]["odp"].total += 1;
            }
            if( datum.status === "PDP" && datum.jenis_kelamin_str === "Perempuan" ) {
                recap_data_cirebon[datum.kode_kabkot]["p"]["pdp"].total += 1;
            }
            if( datum.status === "ODP" && datum.jenis_kelamin_str === "Laki-laki" ) {
                recap_data_cirebon[datum.kode_kabkot]["l"]["odp"].total += 1;
            }
            if( datum.status === "PDP" && datum.jenis_kelamin_str === "Laki-laki" ) {
                recap_data_cirebon[datum.kode_kabkot]["l"]["pdp"].total += 1;
            }
            if( datum.stage === "Aktif") {
                recap_data[datum.kode_kabkot] += 1;
            }
            if( datum.kode_kabkot === "3029"){
                recap_data[datum.kode_kabkot]["Kota Cirebon"] += 1;
            }

        });

            for(i in recap_data) {
                for(j in recap_data[i]) {
                    for( x in recap_data[i][j] ) {
                        document.getElementById("table-data-recap-body").innerHTML += `
                            <tr>
                                <td>${recap_data[i][j][x].name}</td>
                                <td>${recap_data[i][j][x].status}</td>
                                <td>${recap_data[i][j][x].sex}</td>
                                <td>${recap_data[i][j][x].total}</td>
                            </tr>
                        `;
                    }
                }
            }

            for(i in recap_data_cirebon) {
                for(j in recap_data_cirebon[i]) {
                    for( x in recap_data_cirebon[i][j] ) {
                        document.getElementById("table-data-recap-cirebon-body").innerHTML += `
                            <tr>
                                <td>${recap_data_cirebon[i][j][x].name}</td>
                                <td>${recap_data_cirebon[i][j][x].status}</td>
                                <td>${recap_data_cirebon[i][j][x].sex}</td>
                                <td>${recap_data_cirebon[i][j][x].total}</td>
                            </tr>
                        `;
                    }
                }
            }

            document.getElementById("agregasi-pdp-text").innerHTML = total_pdp;
            document.getElementById("agregasi-odp-text").innerHTML = total_odp;
            document.getElementById("agregasi-total-text").innerHTML = total_k;
            document.getElementById("data-cirebon-pdp-text").innerHTML = total_pdp;
            document.getElementById("data-cirebon-odp-text").innerHTML = total_odp;
            document.getElementById("data-cirebon-total-text").innerHTML = total_3029;
});