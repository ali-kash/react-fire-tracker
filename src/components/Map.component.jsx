import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker.component';
import LocationInfoBox from './LocationInfoBox.component';

const Map = ({ eventData, center, zoom }) => {
	const [locationInfo, setLocationInfo] = useState(null);
	const API_KEY = process.env.REACT_APP_FIRE_TRACKER_API_KEY;

	const markers = eventData.map((ev) => {
		if (ev.categories[0].id === 8) {
			return (
				<LocationMarker
					lat={ev.geometries[0].coordinates[1]}
					lng={ev.geometries[0].coordinates[0]}
					key={ev.id}
					onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
				/>
			);
		}
		return null;
	});

	return (
		<div className='map'>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: API_KEY,
				}}
				defaultCenter={center}
				defaultZoom={zoom}
			>
				{markers}
			</GoogleMapReact>

			{locationInfo && <LocationInfoBox info={locationInfo} />}
		</div>
	);
};

Map.defaultProps = {
	center: {
		lat: 40.355178,
		lng: -101.178149,
	},
	zoom: 5,
};

export default Map;
