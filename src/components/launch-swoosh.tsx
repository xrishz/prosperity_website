import {TransportFallback} from './transport-fallback';

export function LaunchSwoosh() {
  return <div className="launch-swoosh" aria-hidden="true">
    <div className="launch-flight"><span className="launch-trail"/><TransportFallback vehicle="plane"/></div>
    <div className="launch-brand">Prosperity<span>Your next journey awaits.</span></div>
  </div>;
}
