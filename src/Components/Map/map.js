import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { firebaseConfig } from "../../Environment/environment";

const mapOptions = {
  disableDefaultUI: true,
  gestureHandling: "greedy",
  clickableIcons: false,
  zoom: 15,
  center: { lat: 50.794236, lng: -1.075 },
};

export const Map = (props) => {
  const places = [
    { latitude: 50.79074042324763, longitude: -1.0760617223679727 },
    { latitude: 50.80074043324763, longitude: -1.0760617223679727 },
  ];

  const [map, setMap] = useState();

  useEffect(() => {
    if (map) {
      const renderMarkers = async (map, maps) => {
        const markersArray = [];
        places.forEach((marker) => {
          console.log(marker);
          markersArray.push(
            new maps.Marker({
              position: {
                lat: marker.latitude,
                lng: marker.longitude,
              },
              map,
            })
          );
        });

        map.setCenter(
          new maps.LatLng(
            (places[1].latitude + places[0].latitude) / 2.0,
            (places[1].longitude + places[0].longitude) / 2.0
          )
        );
        map.fitBounds(
          new maps.LatLngBounds(
            //bottom left
            new maps.LatLng(places[0].latitude, places[0].longitude),
            //top right
            new maps.LatLng(places[1].latitude, places[1].longitude)
          )
        );
      };
      renderMarkers();
    }
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: firebaseConfig.mapApi,
  });

  const renderMap = () => {
    const onLoad = (mapInstance) => {
      setMap(mapInstance);
    };

    const onUnmount = () => {
      setMap(undefined);
    };

    return (
      <>
        <GoogleMap
          mapContainerStyle={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            zIndex: 0,
          }}
          options={{
            ...mapOptions,
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* <RoutePath
            enabled={routeOverlayEnabled}
            path={routeOverlay}
            darkModeEnabled={darkModeEnabled}
          />
          <StopMarkers
            enabled={stopMarkersEnabled}
            stops={stops}
            darkModeEnabled={darkModeEnabled}
            selectedStop={currentStop}
            onMarkerSelect={onMarkerSelect}
          /> */}
        </GoogleMap>
      </>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded :(</div>;
  }

  return isLoaded ? renderMap() : <div>loading...</div>;
};

export default Map;
