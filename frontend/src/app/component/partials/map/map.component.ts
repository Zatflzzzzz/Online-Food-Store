import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from '../../../services/location/location.service';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {
  @Input() order!:Order;

  @Input() readonly = false;

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];
  private readonly MARKER_ICON = icon({
    iconUrl:'https://cdn-icons-png.flaticon.com/128/2776/2776067.png',
    iconSize:[30,30],
    iconAnchor:[30,30]
  })

  @ViewChild('map', {static:true})
  mapRef!: ElementRef;
  map!:Map;
  currentMarker!:Marker;

  constructor(private locationService: LocationService) { }

  ngOnChanges():void{
    if(!this.order) return;

    this.initializeMap();

    if(this.readonly && this.addressLatLng){
      this.showLocationReadonlyMode();
    }
  }

  initializeMap(){
    if(this.map) return;

    this.map = map('map', {
      center:this.DEFAULT_LATLNG,
      zoom:6
    })

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlng)
      }
    })
  }

  setMarker(latlng:LatLngExpression){
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker)
    {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
    }).addTo(this.map);


    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng: LatLng){
    if(!latlng.lat.toFixed) return;
 
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  showLocationReadonlyMode() {
    const map = this.map;
    this.setMarker(this.addressLatLng)

    map.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.off('click');
    map.tap?.disable;
    this.currentMarker.dragging?.disable();
  }
}