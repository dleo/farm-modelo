import {Api} from "./api";

class SectorService {
    api: Api;
    sectors: Array<Sector> = [];

    constructor(api: Api) {
        this.api = api;
    };

    getSectors() {
        return this.api.get('sectors', {p: "-1"})
            .then((sectors) => {
                const data = JSON.parse(sectors);
                this.sectors = data.data;
            });
    };

    // Map a name to sector id
    map(name: string) {
        let sector: Sector;
        sector = this.sectors.find(function (sector) {
            return sector.name.toUpperCase() == name;
        });

        return sector;
    };
}

interface Sector {
    id: number;
    size: number;
    distance: number;
    precipitation: number;
    plantation_year: string;
    name: string;
    m3_hour: string;
    lt_second: string;
    created_at: string;
    updated_at: string;
    variety_id: number;
    irrigation_device_id: number;
    associated_sector_id: number;
    mask: number;
    enabled: number;
    watering_time: string;
    geo_options: Array<LatLng>;
    pond?: string;
    type_irrigation: number;
    efficiency: number;
    quantity_plants?: number;
    quantity_plants_per_ha?: number;
    quantity_transmitter_by_plants?: number;
    flow_transmitter?: number;
    type_soil?: number;
    farm_id: number;
    log_time: string;
    available: number;
}

interface LatLng {
    lat: number;
    lng: number;
}

export {SectorService};
