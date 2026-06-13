/* ═══════════════════════════════════════════════════════════════
   SAR Ops — app.js
   v1.0 — Single-page dispatcher + member prototype
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Shared State ──────────────────────────────────────────────── */
const APP = {
  currentUser: null,   // { id, name, initials, avatarColor, role }
  screen: 'entry',
  params: {},
  nudged: {},
  gearChecked: {},
  memberResponseDraft: { availability: null, needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '' },
  mapPin: null,
};

/* ─── Data ──────────────────────────────────────────────────────── */
const MEMBERS = [
  { id: 'm1',  name: 'Alex (you)',      initials: 'AL', avatarColor: 'av-blue',   role: 'dispatcher' },
  { id: 'm2',  name: 'Nadia Okafor',   initials: 'NO', avatarColor: 'av-teal',   role: 'member' },
  { id: 'm3',  name: 'Sam Chen',       initials: 'SC', avatarColor: 'av-blue',   role: 'member' },
  { id: 'm4',  name: 'Jin Kim',        initials: 'JK', avatarColor: 'av-green',  role: 'member' },
  { id: 'm5',  name: 'Riley Patel',    initials: 'RP', avatarColor: 'av-purple', role: 'member' },
  { id: 'm6',  name: 'Tara Walsh',     initials: 'TW', avatarColor: 'av-orange', role: 'member' },
  { id: 'm7',  name: 'Dana Hwang',     initials: 'DH', avatarColor: 'av-blue',   role: 'member' },
  { id: 'm8',  name: 'Ben Ortiz',      initials: 'BO', avatarColor: 'av-purple', role: 'member' },
  { id: 'm9',  name: 'Pat Reeves',     initials: 'PR', avatarColor: 'av-green',  role: 'member' },
  { id: 'm10', name: 'A. Osei',        initials: 'AO', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm11', name: 'F. Brennan',     initials: 'FB', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm12', name: 'G. Santos',      initials: 'GS', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm13', name: 'H. Park',        initials: 'HP', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm14', name: 'J. Moore',       initials: 'JM', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm15', name: 'K. Ellis',       initials: 'KE', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm16', name: 'M. Washington',  initials: 'MW', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm17', name: 'C. Lopez',       initials: 'CL', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm18', name: 'L. Nguyen',      initials: 'LN', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm19', name: 'M. Torres',      initials: 'MT', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm20', name: 'N. Webb',        initials: 'NW', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm21', name: 'O. Diaz',        initials: 'OD', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm22', name: 'P. Scott',       initials: 'PS', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm23', name: 'R. Ahmed',       initials: 'RA', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm24', name: 'S. Clark',       initials: 'SC', avatarColor: 'av-gray',   role: 'member' },
  { id: 'm25', name: 'T. Quinn',        initials: 'TQ', avatarColor: 'av-gray',   role: 'member' },
];

const MISSIONS = [
  {
    id: 'msn-047',
    title: 'Lost hiker — Hawksbill Summit',
    location: 'Shenandoah NP · VDEM',
    agency: 'VDEM',
    poc: 'Ranger M. Flores',
    pocPhone: '(540) 555-0193',
    baseName: 'Hawksbill Summit Trailhead',
    baseAddress: 'Skyline Drive, Luray, VA 22835',
    baseCoords: '18S UJ 5914 3782',
    description: 'Adult male, 52, last seen on Hawksbill Summit trail at approx 11:00. Weather deteriorating. Subject has no overnight gear.',
    notes: 'Access via Skyline Drive milepost 45.6. Gate may be locked after dark — contact Ranger Flores for code.',
    status: 'active',
    createdAt: 'Apr 25, 2026 at 14:23',
    updatedAt: 'Apr 25, 2026 at 14:41',
    alertSentAt: 'Apr 25, 2026 at 14:24',
  },
  {
    id: 'msn-046',
    title: 'Overdue trail runner — Old Rag',
    location: 'Old Rag Mountain · Page Co. Sheriff',
    agency: 'Page Co. Sheriff',
    poc: 'Deputy T. Marsh',
    pocPhone: '(540) 555-0287',
    baseName: 'Old Rag Parking Lot',
    baseAddress: 'Old Rag Rd, Etlan, VA 22719',
    baseCoords: '18S UJ 6201 4053',
    description: 'Female trail runner, 34, overdue by 4 hours. Last known location near Ridge Trail junction.',
    notes: '',
    status: 'active',
    createdAt: 'Apr 25, 2026 at 09:15',
    updatedAt: 'Apr 25, 2026 at 14:25',
    alertSentAt: 'Apr 25, 2026 at 09:18',
  },
  {
    id: 'msn-045',
    title: 'Overdue kayaker — Shenandoah River',
    location: 'Shenandoah River · Warren Co. EM',
    agency: 'Warren Co. EM',
    poc: 'Coordinator J. Mills',
    pocPhone: '(540) 555-0291',
    baseName: 'Shenandoah River Access',
    baseAddress: 'River Rd, Front Royal, VA 22630',
    baseCoords: '18S UJ 4872 3561',
    description: 'Group of three kayakers, overdue at takeout by 3 hours. River conditions elevated after recent rain.',
    notes: 'Water rescue team already on scene. SMRG needed for shoreline search.',
    status: 'standby',
    createdAt: 'Apr 25, 2026 at 08:40',
    updatedAt: 'Apr 25, 2026 at 13:18',
    alertSentAt: null,
  },
  {
    id: 'msn-043',
    title: 'Missing camper — Dolly Sods Wilderness',
    location: 'Dolly Sods, WV · WVDHSEM',
    agency: 'WVDHSEM',
    poc: 'EM Director L. Crane',
    pocPhone: '(304) 555-0144',
    baseName: 'Dolly Sods Trailhead',
    baseAddress: 'Forest Rd 75, Jordan Run, WV 26757',
    baseCoords: '18S VJ 1204 4812',
    description: 'Solo camper, 19, reported overdue by family. Last seen 2 days ago near Red Creek campsite.',
    notes: 'Suspended due to severe thunderstorms moving through area. Resume expected when conditions clear — monitor NWS.',
    status: 'suspended',
    createdAt: 'Apr 24, 2026 at 07:00',
    updatedAt: 'Apr 25, 2026 at 08:02',
    alertSentAt: 'Apr 24, 2026 at 07:05',
    suspendReason: 'Severe weather — resume expected when conditions clear.',
  },
  {
    id: 'msn-044',
    title: 'Injured hiker — Whiteoak Canyon',
    location: 'Whiteoak Canyon Trail · VDEM',
    agency: 'VDEM',
    poc: 'Ranger B. Sutton',
    pocPhone: '(540) 555-0102',
    baseName: '',
    baseAddress: '',
    baseCoords: '',
    description: 'Hiker with suspected broken ankle, 2.3 miles in on Whiteoak Canyon Trail.',
    notes: '',
    status: 'closed',
    createdAt: 'Apr 24, 2026 at 11:10',
    updatedAt: 'Apr 24, 2026 at 19:45',
    alertSentAt: 'Apr 24, 2026 at 11:12',
  },
  {
    id: 'msn-042',
    title: 'Missing child — Skyline Drive',
    location: 'Skyline Drive, Shenandoah NP · NPS',
    agency: 'NPS',
    poc: 'Chief Ranger P. Hall',
    pocPhone: '(540) 555-0331',
    baseName: '',
    baseAddress: '',
    baseCoords: '',
    description: '7-year-old separated from family at Skyline Drive overlook.',
    notes: '',
    status: 'closed',
    createdAt: 'Apr 21, 2026 at 09:00',
    updatedAt: 'Apr 21, 2026 at 11:30',
    alertSentAt: 'Apr 21, 2026 at 09:02',
  },
  {
    id: 'msn-041',
    title: 'Overdue backpacker — Appalachian Trail',
    location: 'AT, Front Royal · VDEM',
    agency: 'VDEM',
    poc: 'Coordinator D. Walsh',
    pocPhone: '(540) 555-0412',
    baseName: '',
    baseAddress: '',
    baseCoords: '',
    description: 'Thru-hiker overdue at resupply point by 2 days.',
    notes: '',
    status: 'closed',
    createdAt: 'Apr 17, 2026 at 06:00',
    updatedAt: 'Apr 17, 2026 at 08:15',
    alertSentAt: 'Apr 17, 2026 at 06:05',
  },
  {
    id: 'msn-040',
    title: 'Lost hunters — GW National Forest',
    location: 'GW National Forest · Augusta Co. Sheriff',
    agency: 'Augusta Co. Sheriff',
    poc: 'Sgt. R. Conley',
    pocPhone: '(540) 555-0509',
    baseName: '',
    baseAddress: '',
    baseCoords: '',
    description: 'Two hunters failed to return to truck at end of day.',
    notes: '',
    status: 'closed',
    createdAt: 'Apr 12, 2026 at 14:00',
    updatedAt: 'Apr 12, 2026 at 16:55',
    alertSentAt: 'Apr 12, 2026 at 14:05',
  },
  {
    id: 'msn-039',
    title: 'Injured climber — Seneca Rocks',
    location: 'Seneca Rocks, WV · WVDHSEM',
    agency: 'WVDHSEM',
    poc: 'Rescue Coord. A. Finch',
    pocPhone: '(304) 555-0219',
    baseName: '',
    baseAddress: '',
    baseCoords: '',
    description: 'Technical climber with fall injury at mid-route. Requires rope rescue.',
    notes: '',
    status: 'closed',
    createdAt: 'Apr 8, 2026 at 11:00',
    updatedAt: 'Apr 8, 2026 at 14:20',
    alertSentAt: 'Apr 8, 2026 at 11:03',
  },
  {
    id: 'msn-038',
    title: 'Missing kayaker — Shenandoah River',
    location: 'Shenandoah River, Luray · Page Co. Sheriff',
    agency: 'Page Co. Sheriff',
    poc: 'Deputy M. Knox',
    pocPhone: '(540) 555-0618',
    baseName: '',
    baseAddress: '',
    baseCoords: '',
    description: 'Solo kayaker failed to reach takeout by scheduled time.',
    notes: '',
    status: 'closed',
    createdAt: 'Apr 3, 2026 at 08:00',
    updatedAt: 'Apr 3, 2026 at 09:40',
    alertSentAt: 'Apr 3, 2026 at 08:04',
  },
];

/* Responses — fixed 25-member roster, every mission sums to 25
   Team: m1 (dispatcher, excluded from responses) + m2–m25 (24 members) = 25 total
   Each mission has exactly 25 responses covering m2–m25.
   Counts per mission must equal: search + dispatch + unavailable + no_response = 25
*/

/* Helper to build no_response entries for members not explicitly listed */
function _nr(missionId, ids) {
  return ids.map(id => ({ missionId, memberId: id, availability: 'no_response', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false }));
}

const RESPONSES = [
  /* ── msn-047 ACTIVE: 6 search, 3 dispatch, 2 unavailable, 14 no_response = 25 ── */
  { missionId: 'msn-047', memberId: 'm2',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '14:40', eta: '15:55', vehicle: 'Red Ford F-150 · VA ABC-1001',        checkedIn: false },
  { missionId: 'msn-047', memberId: 'm3',  availability: 'search',      needsRide: false, canTakePassengers: true,  departureTime: '14:35', eta: '15:40', vehicle: 'Blue Honda CR-V · VA XYZ-2020',       checkedIn: false },
  { missionId: 'msn-047', memberId: 'm4',  availability: 'search',      needsRide: false, canTakePassengers: true,  departureTime: '14:50', eta: '16:10', vehicle: 'Green Subaru Outback · VA GHI-3030',  checkedIn: false },
  { missionId: 'msn-047', memberId: 'm5',  availability: 'search',      needsRide: true,  canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                                   checkedIn: false },
  { missionId: 'msn-047', memberId: 'm10', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '14:55', eta: '16:05', vehicle: 'Gray Tacoma · VA JKL-4040',          checkedIn: false },
  { missionId: 'msn-047', memberId: 'm11', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '15:00', eta: '16:15', vehicle: 'Blue Tundra · VA MNO-5050',          checkedIn: false },
  { missionId: 'msn-047', memberId: 'm7',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                                   checkedIn: false },
  { missionId: 'msn-047', memberId: 'm8',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                                   checkedIn: false },
  { missionId: 'msn-047', memberId: 'm9',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                                   checkedIn: false },
  { missionId: 'msn-047', memberId: 'm6',  availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                                   checkedIn: false },
  { missionId: 'msn-047', memberId: 'm16', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                                   checkedIn: false },
  ..._nr('msn-047', ['m12','m13','m14','m15','m17','m18','m19','m20','m21','m22','m23','m24','m25','m1']),

  /* ── msn-046 ACTIVE: 9 search, 2 dispatch, 4 unavailable, 10 no_response = 25 ── */
  { missionId: 'msn-046', memberId: 'm2',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '09:10', eta: '10:00', vehicle: 'Red Ford F-150',    checkedIn: true  },
  { missionId: 'msn-046', memberId: 'm3',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '09:00', eta: '09:55', vehicle: 'Blue Honda CR-V',   checkedIn: true  },
  { missionId: 'msn-046', memberId: 'm4',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '09:20', eta: '10:10', vehicle: 'Green Subaru',      checkedIn: false },
  { missionId: 'msn-046', memberId: 'm5',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '09:30', eta: '10:20', vehicle: 'Silver Toyota',     checkedIn: false },
  { missionId: 'msn-046', memberId: 'm8',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '09:25', eta: '10:15', vehicle: 'Black Jeep',        checkedIn: false },
  { missionId: 'msn-046', memberId: 'm9',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '09:15', eta: '10:05', vehicle: 'White RAM',         checkedIn: false },
  { missionId: 'msn-046', memberId: 'm10', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '09:40', eta: '10:30', vehicle: 'Gray Tacoma',       checkedIn: false },
  { missionId: 'msn-046', memberId: 'm11', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '09:45', eta: '10:35', vehicle: 'Blue Tundra',       checkedIn: false },
  { missionId: 'msn-046', memberId: 'm12', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '09:50', eta: '10:40', vehicle: 'Red RAV4',          checkedIn: false },
  { missionId: 'msn-046', memberId: 'm7',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                  checkedIn: false },
  { missionId: 'msn-046', memberId: 'm6',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                  checkedIn: false },
  { missionId: 'msn-046', memberId: 'm16', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                  checkedIn: false },
  { missionId: 'msn-046', memberId: 'm17', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                  checkedIn: false },
  { missionId: 'msn-046', memberId: 'm18', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                  checkedIn: false },
  { missionId: 'msn-046', memberId: 'm19', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '',      eta: '',      vehicle: '',                  checkedIn: false },
  ..._nr('msn-046', ['m13','m14','m15','m20','m21','m22','m23','m24','m25','m1']),

  /* ── msn-045 STANDBY: 4 search, 2 dispatch, 5 unavailable, 14 no_response = 25 ── */
  { missionId: 'msn-045', memberId: 'm2',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-045', memberId: 'm3',  availability: 'search',      needsRide: false, canTakePassengers: true,  departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-045', memberId: 'm4',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-045', memberId: 'm5',  availability: 'search',      needsRide: true,  canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-045', memberId: 'm7',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-045', memberId: 'm8',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-045', memberId: 'm6',  availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-045', memberId: 'm9',  availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-045', memberId: 'm16', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-045', memberId: 'm17', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-045', memberId: 'm18', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  ..._nr('msn-045', ['m10','m11','m12','m13','m14','m15','m19','m20','m21','m22','m23','m24','m25','m1']),

  /* ── msn-043 SUSPENDED: 7 search, 2 dispatch, 3 unavailable, 13 no_response = 25 ── */
  { missionId: 'msn-043', memberId: 'm2',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm3',  availability: 'search',      needsRide: false, canTakePassengers: true,  departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm4',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm5',  availability: 'search',      needsRide: true,  canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm9',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm10', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm11', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm7',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm8',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm6',  availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm16', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-043', memberId: 'm17', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  ..._nr('msn-043', ['m12','m13','m14','m15','m18','m19','m20','m21','m22','m23','m24','m25','m1']),

  /* ── msn-044 CLOSED: 11 search, 3 dispatch, 6 unavailable, 5 no_response = 25 ── */
  { missionId: 'msn-044', memberId: 'm2',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-044', memberId: 'm3',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-044', memberId: 'm4',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-044', memberId: 'm5',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-044', memberId: 'm8',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-044', memberId: 'm9',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-044', memberId: 'm10', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-044', memberId: 'm11', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm12', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm13', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm14', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm7',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm15', availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm25', availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm6',  availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm16', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm17', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm18', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm19', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-044', memberId: 'm20', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  ..._nr('msn-044', ['m21','m22','m23','m24','m1']),

  /* ── msn-042 CLOSED: 8 search, 2 dispatch, 4 unavailable, 11 no_response = 25 ── */
  { missionId: 'msn-042', memberId: 'm2',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-042', memberId: 'm3',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-042', memberId: 'm4',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-042', memberId: 'm5',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-042', memberId: 'm8',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-042', memberId: 'm9',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-042', memberId: 'm10', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-042', memberId: 'm11', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-042', memberId: 'm7',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-042', memberId: 'm6',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-042', memberId: 'm16', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-042', memberId: 'm17', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-042', memberId: 'm18', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-042', memberId: 'm19', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  ..._nr('msn-042', ['m12','m13','m14','m15','m20','m21','m22','m23','m24','m25','m1']),

  /* ── msn-041 CLOSED: 6 search, 1 dispatch, 5 unavailable, 13 no_response = 25 ── */
  { missionId: 'msn-041', memberId: 'm2',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-041', memberId: 'm3',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-041', memberId: 'm4',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-041', memberId: 'm5',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-041', memberId: 'm8',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-041', memberId: 'm9',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-041', memberId: 'm7',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-041', memberId: 'm6',  availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-041', memberId: 'm16', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-041', memberId: 'm17', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-041', memberId: 'm18', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-041', memberId: 'm19', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  ..._nr('msn-041', ['m10','m11','m12','m13','m14','m15','m20','m21','m22','m23','m24','m25','m1']),

  /* ── msn-040 CLOSED: 7 search, 2 dispatch, 3 unavailable, 13 no_response = 25 ── */
  { missionId: 'msn-040', memberId: 'm2',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-040', memberId: 'm3',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-040', memberId: 'm4',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-040', memberId: 'm5',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-040', memberId: 'm8',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-040', memberId: 'm9',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-040', memberId: 'm10', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-040', memberId: 'm7',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-040', memberId: 'm6',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-040', memberId: 'm16', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-040', memberId: 'm17', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-040', memberId: 'm18', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  ..._nr('msn-040', ['m11','m12','m13','m14','m15','m19','m20','m21','m22','m23','m24','m25','m1']),

  /* ── msn-039 CLOSED: 5 search, 2 dispatch, 4 unavailable, 14 no_response = 25 ── */
  { missionId: 'msn-039', memberId: 'm2',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-039', memberId: 'm3',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-039', memberId: 'm4',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-039', memberId: 'm5',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-039', memberId: 'm8',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-039', memberId: 'm7',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-039', memberId: 'm6',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-039', memberId: 'm16', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-039', memberId: 'm17', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-039', memberId: 'm18', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-039', memberId: 'm19', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  ..._nr('msn-039', ['m9','m10','m11','m12','m13','m14','m15','m20','m21','m22','m23','m24','m25','m1']),

  /* ── msn-038 CLOSED: 9 search, 2 dispatch, 3 unavailable, 11 no_response = 25 ── */
  { missionId: 'msn-038', memberId: 'm2',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-038', memberId: 'm3',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-038', memberId: 'm4',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-038', memberId: 'm5',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-038', memberId: 'm8',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: true  },
  { missionId: 'msn-038', memberId: 'm9',  availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-038', memberId: 'm10', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-038', memberId: 'm11', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-038', memberId: 'm12', availability: 'search',      needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-038', memberId: 'm7',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-038', memberId: 'm6',  availability: 'dispatch',    needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-038', memberId: 'm16', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-038', memberId: 'm17', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  { missionId: 'msn-038', memberId: 'm18', availability: 'unavailable', needsRide: false, canTakePassengers: false, departureTime: '', eta: '', vehicle: '', checkedIn: false },
  ..._nr('msn-038', ['m13','m14','m15','m19','m20','m21','m22','m23','m24','m25','m1']),
];

const INCIDENT_LOGS = {
  'msn-047': [
    { timestamp: '14:23', text: 'Mission <b>#2026-047</b> created' },
    { timestamp: '14:24', text: 'Activation alert sent to <b>24 members</b>' },
    { timestamp: '14:27', text: '<b>Nadia Okafor</b> — available for search, ETA 15:55' },
    { timestamp: '14:28', text: '<b>Dana Hwang</b> — available for dispatch' },
    { timestamp: '14:29', text: '<b>Sam Chen</b> — available for search, driving solo' },
    { timestamp: '14:31', text: '<b>M. Washington</b> — unavailable' },
    { timestamp: '14:33', text: '<b>Jin Kim</b> — available for search, can take passenger' },
    { timestamp: '14:34', text: '<b>Ben Ortiz</b> — available for dispatch' },
    { timestamp: '14:35', text: '<b>Riley Patel</b> — available for search, needs a ride' },
    { timestamp: '14:37', text: '<b>Pat Reeves</b> — available for dispatch' },
    { timestamp: '14:38', text: '<b>Tara Walsh</b> — unavailable' },
  ],
  'msn-046': [
    { timestamp: '09:15', text: 'Mission <b>#2026-046</b> created' },
    { timestamp: '09:18', text: 'Activation alert sent to <b>24 members</b>' },
    { timestamp: '09:22', text: '<b>Nadia Okafor</b> — available for search' },
    { timestamp: '09:25', text: '<b>Sam Chen</b> — available for search' },
    { timestamp: '09:30', text: '<b>Dana Hwang</b> — available for dispatch' },
    { timestamp: '09:35', text: '<b>M. Washington</b> — unavailable' },
  ],
  'msn-045': [
    { timestamp: '08:40', text: 'Pre-callout received from <b>Warren Co. EM</b>' },
    { timestamp: '08:42', text: 'Mission <b>#2026-045</b> created' },
    { timestamp: '08:45', text: 'Standby alert sent to <b>24 members</b>' },
    { timestamp: '09:02', text: '<b>Nadia Okafor</b> — available for search' },
    { timestamp: '09:10', text: '<b>Sam Chen</b> — available for search' },
  ],
  'msn-043': [
    { timestamp: '07:00', text: 'Mission <b>#2026-043</b> created' },
    { timestamp: '07:05', text: 'Activation alert sent to <b>24 members</b>' },
    { timestamp: '07:15', text: '<b>Nadia Okafor</b> — available for search' },
    { timestamp: '08:02', text: 'Mission suspended — severe weather' },
  ],
  'msn-044': [
    { timestamp: '11:10', text: 'Mission <b>#2026-044</b> created' },
    { timestamp: '11:12', text: 'Activation alert sent to <b>24 members</b>' },
    { timestamp: '19:45', text: 'Mission closed — subject evacuated successfully' },
  ],
};

/* ─── Derived helpers ───────────────────────────────────────────── */
function getResponses(missionId) {
  // All responses are explicit in RESPONSES (including no_response entries via _nr()).
  // This ensures every mission always totals exactly 25.
  return RESPONSES.filter(r => r.missionId === missionId);
}

function getCounts(missionId) {
  const rs = getResponses(missionId);
  return {
    search:      rs.filter(r => r.availability === 'search').length,
    dispatch:    rs.filter(r => r.availability === 'dispatch').length,
    unavailable: rs.filter(r => r.availability === 'unavailable').length,
    no_response: rs.filter(r => r.availability === 'no_response').length,
  };
}

function getMission(id) { return MISSIONS.find(m => m.id === id); }
function getMember(id)  { return MEMBERS.find(m => m.id === id); }
function getLog(missionId) { return INCIDENT_LOGS[missionId] || []; }

/* ─── Navigation ────────────────────────────────────────────────── */
function navigate(screen, params = {}) {
  APP.screen = screen;
  APP.params = params;
  APP.nudged = {};
  window.scrollTo(0, 0);
  render();
}

/* ─── Icons (inline SVG helpers) ───────────────────────────────── */
const ICON_ARR  = `<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="#185FA5" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_PIN  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3C8.13 3 5 6.13 5 10c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="var(--text-2)" stroke-width="1.2" fill="none"/><circle cx="12" cy="10" r="3" stroke="var(--text-2)" stroke-width="1.2"/></svg>`;
const ICON_CLK  = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#185FA5" stroke-width="1.2"/><path d="M7 4v3.5l2 1.5" stroke="#185FA5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
/* Dispatcher: headset icon — someone coordinating remotely */
const ICON_DISP = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 14C6 9.58 9.58 6 14 6C18.42 6 22 9.58 22 14" stroke="#185FA5" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="4" y="13" width="4" height="6" rx="2" fill="#185FA5" opacity="0.18" stroke="#185FA5" stroke-width="1.4"/>
  <rect x="20" y="13" width="4" height="6" rx="2" fill="#185FA5" opacity="0.18" stroke="#185FA5" stroke-width="1.4"/>
  <path d="M22 19v1a4 4 0 01-4 4h-2" stroke="#185FA5" stroke-width="1.4" stroke-linecap="round"/>
  <circle cx="15" cy="24" r="1.2" fill="#185FA5"/>
</svg>`;

/* Member: person with waypoint pin — someone moving to a location */
const ICON_MBR  = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="11" cy="8" r="3.2" stroke="#0F6E56" stroke-width="1.5"/>
  <path d="M4 22c0-3.87 3.13-7 7-7h.5" stroke="#0F6E56" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M20 12c-2.21 0-4 1.79-4 4 0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4z" fill="#0F6E56" opacity="0.15" stroke="#0F6E56" stroke-width="1.4"/>
  <circle cx="20" cy="16.2" r="1.4" fill="#0F6E56"/>
</svg>`;

/* ─── Topbar ────────────────────────────────────────────────────── */
function renderTopbar(showNew = false) {
  const u = APP.currentUser;
  return `
  <div class="topbar">
    <span class="topbar-logo">SAR Ops</span>
    <div class="topbar-right">
      ${u ? `<span class="topbar-user">${u.role === 'dispatcher' ? 'Dispatcher' : 'Member'} — ${u.name.replace(' (you)', '')}</span>` : ''}
      ${u ? `<div class="av ${u.avatarColor}">${u.initials}</div>` : ''}
      ${showNew ? `<button class="btn btn-green btn-sm" onclick="navigate('new-mission')">+ New mission</button>` : ''}
    </div>
  </div>`;
}

/* ─── Breadcrumb ────────────────────────────────────────────────── */
function bc(crumbs) {
  return `<div class="breadcrumb">${crumbs.map((c, i) => {
    if (i < crumbs.length - 1) {
      return `<span class="bc-link" onclick="navigate('${c.screen}',${JSON.stringify(c.params||{})})">${c.label}</span><span class="bc-sep">›</span>`;
    }
    return `<span class="bc-cur">${c.label}</span>`;
  }).join('')}</div>`;
}

/* ─── Pill renderers ────────────────────────────────────────────── */
function statusPill(status) {
  const map = { active: ['Active','pill-active'], standby: ['Standby','pill-standby'], suspended: ['Suspended','pill-suspended'], closed: ['Closed','pill-closed'] };
  const [label, cls] = map[status] || ['Unknown','pill-closed'];
  return `<span class="pill ${cls}">${label}</span>`;
}
function availPill(av) {
  const map = { search: ['Search','pill-search'], dispatch: ['Dispatch','pill-dispatch'], unavailable: ['Unavailable','pill-unavail'], no_response: ['No response','pill-noresp'] };
  const [label, cls] = map[av] || ['—','pill-noresp'];
  return `<span class="pill ${cls}">${label}</span>`;
}

/* ─── Roster row ────────────────────────────────────────────────── */
function rosterRow(member, resp) {
  const detail = resp.availability === 'search'
    ? [resp.needsRide ? 'Needs a ride' : resp.canTakePassengers ? 'Can take passenger' : 'Driving solo', resp.eta ? `ETA ${resp.eta}` : ''].filter(Boolean).join(' · ')
    : resp.availability === 'dispatch' ? 'Remote · Available now'
    : '';
  return `
  <div class="roster-row">
    <div class="av ${member.avatarColor}">${member.initials}</div>
    <div class="roster-info">
      <div class="roster-name">${member.name}</div>
      ${detail ? `<div class="roster-detail">${detail}</div>` : ''}
    </div>
    ${availPill(resp.availability)}
  </div>`;
}

/* ─── MAP HELPERS ───────────────────────────────────────────────── */
const USNG_SAMPLES = ['18S UJ 5914 3782','18S UJ 6201 4053','18S UJ 4872 3561','18S UJ 5543 4218','18S UJ 6089 3490','18S UJ 5231 3874'];

function mapWidget(pinned = false, coordLabel = '') {
  return `
  <div class="map-area">
    <div class="map-body" id="map-body" onclick="handleMapClick(event)">
      <svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.10;" viewBox="0 0 400 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5"/></pattern></defs>
        <rect width="400" height="200" fill="url(#g)"/>
        <path d="M0,120 Q50,90 100,110 Q150,130 200,100 Q250,70 300,95 Q350,120 400,85" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
        <circle cx="80" cy="105" r="25" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
        <circle cx="280" cy="95" r="20" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
      </svg>
      <div id="map-prompt" style="display:${pinned?'none':'flex'};flex-direction:column;align-items:center;gap:8px;z-index:1;">
        ${ICON_PIN}
        <span>Click anywhere to pin base location</span>
      </div>
      <div id="pin-el" style="display:${pinned?'block':'none'};position:absolute;transform:translate(-50%,-100%);pointer-events:none;${pinned&&APP.mapPin?`left:${APP.mapPin.x}px;top:${APP.mapPin.y}px`:''}"">
        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:10px;font-weight:600;color:#fff;background:var(--green);padding:2px 7px;border-radius:20px;white-space:nowrap;margin-bottom:3px;">Base</span>
          <div style="width:12px;height:12px;border-radius:50%;background:var(--green);border:2px solid #fff;"></div>
          <div style="width:1.5px;height:10px;background:var(--green);"></div>
        </div>
      </div>
    </div>
    <div class="map-toolbar">
      <span class="map-hint" id="map-hint">${pinned ? 'Pin placed — click to move' : 'No pin placed'}</span>
      <div style="display:flex;gap:8px;align-items:center;">
        <span class="coord-badge" id="coord-badge" style="display:${pinned?'inline-block':'none'};">${coordLabel}</span>
        <button class="btn btn-sm" id="clear-pin-btn" style="display:${pinned?'flex':'none'};align-items:center;gap:4px;" onclick="clearMapPin()">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          Clear
        </button>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   SCREENS
   ════════════════════════════════════════════════════════════════ */

/* ─── 1. Entry ──────────────────────────────────────────────────── */
function screenEntry() {
  return `
  <div class="entry-wrap">
    <div class="entry-identity">
      <div class="entry-org">Shenandoah Mountain Rescue Group</div>
      <div class="entry-wordmark">SAR Ops</div>
      <div class="entry-rule"></div>
      <div class="entry-prompt">Select your role to continue</div>
    </div>
    <div class="role-cards">
      <div class="role-card" onclick="selectRole('dispatcher')">
        <div class="role-card-inner">
          <div class="role-icon-wrap role-icon-blue">${ICON_DISP}</div>
          <div class="role-card-text">
            <div class="role-title">Dispatcher</div>
            <div class="role-sub">Manage alerts and monitor team activity</div>
          </div>
        </div>
      </div>
      <div class="role-card" onclick="selectRole('member')">
        <div class="role-card-inner">
          <div class="role-icon-wrap role-icon-green">${ICON_MBR}</div>
          <div class="role-card-text">
            <div class="role-title">Member</div>
            <div class="role-sub">Receive alerts and report availability</div>
          </div>
        </div>
      </div>
    </div>
    <div class="entry-footer">SAR Ops · v1.7 · Shenandoah Mountain Rescue Group</div>
  </div>`;
}

/* ─── 2. Missions list ──────────────────────────────────────────── */
// Filter state lives on APP so pills can toggle it
if (!APP.missionFilter) APP.missionFilter = 'all';

function setMissionFilter(f) {
  APP.missionFilter = f;
  render();
}

function screenMissionsList() {
  const allMissions = MISSIONS;
  const f = APP.missionFilter;

  const active    = allMissions.filter(m => m.status === 'active');
  const standby   = allMissions.filter(m => m.status === 'standby');
  const suspended = allMissions.filter(m => m.status === 'suspended');
  const closed    = allMissions.filter(m => m.status === 'closed');

  const showActive    = f === 'all' || f === 'active';
  const showStandby   = f === 'all' || f === 'standby';
  const showSuspended = f === 'all' || f === 'suspended';
  const showClosed    = f === 'all' || f === 'closed';

  function filterBtn(label, value) {
    const isOn = f === value;
    return `<div class="filter-btn ${isOn ? 'on' : ''}" onclick="setMissionFilter('${value}')">${label}</div>`;
  }

  function activeRow(m) {
    const c = getCounts(m.id);
    const timeLabel = m.status === 'active' ? 'Activated' : m.status === 'standby' ? 'Pre-callout' : 'Updated';
    return `
    <div class="mission-row" onclick="navigate('mission-detail',{missionId:'${m.id}'})">
      <div class="mission-row-top">
        <div class="mission-row-left">
          <div class="mission-name ml-clickable">${m.title}</div>
          <div class="mission-loc">${m.location}</div>
          <div class="mission-time">${timeLabel} ${m.createdAt}</div>
          <div class="mission-time">Updated ${m.updatedAt}</div>
          ${m.suspendReason ? `<div class="suspend-note">${m.suspendReason}</div>` : ''}
        </div>
        ${statusPill(m.status)}
      </div>
      <div class="mission-body">
        <div class="mission-stats">
          <div class="stat-box"><div class="stat-n grn">${c.search}</div><div class="stat-l">Available for search</div></div>
          <div class="stat-box"><div class="stat-n blu">${c.dispatch}</div><div class="stat-l">Available for dispatch</div></div>
          <div class="stat-box"><div class="stat-n red">${c.unavailable}</div><div class="stat-l">Unavailable</div></div>
          <div class="stat-box"><div class="stat-n gry">${c.no_response}</div><div class="stat-l">Not yet responded</div></div>
        </div>
      </div>
    </div>`;
  }

  function closedRow(m) {
    const msnNum = m.id.replace('msn-','2026-');
    return `
    <div class="closed-row" onclick="navigate('mission-detail',{missionId:'${m.id}'})">
      <div class="closed-left">
        <div class="closed-name ml-clickable">${m.title}</div>
        <div class="closed-meta">${m.location} · #${msnNum}</div>
        <div class="closed-meta" style="margin-top:2px;">Closed ${m.updatedAt}</div>
      </div>
    </div>`;
  }

  return `
  ${renderTopbar(true)}
  ${bc([{label:'Home',screen:'entry'},{label:'Missions'}])}
  <div class="page">
    <div class="page-hdr" style="display:flex;align-items:flex-end;justify-content:space-between;">
      <div>
        <div class="page-title">Missions</div>
        <div class="page-sub">Shenandoah Mountain Rescue Group</div>
      </div>
      <div class="filters">
        ${filterBtn('All','all')}
        ${filterBtn('Active','active')}
        ${filterBtn('Standby','standby')}
        ${filterBtn('Suspended','suspended')}
        ${filterBtn('Closed','closed')}
      </div>
    </div>

    ${showActive && active.length ? `<div class="t-section">Active</div>${active.map(activeRow).join('')}` : ''}
    ${showStandby && standby.length ? `<div class="t-section" style="margin-top:16px;">Standby</div>${standby.map(activeRow).join('')}` : ''}
    ${showSuspended && suspended.length ? `<div class="t-section" style="margin-top:16px;">Suspended</div>${suspended.map(activeRow).join('')}` : ''}
    ${showClosed && closed.length ? `<div class="t-section" style="margin-top:16px;">Closed</div>${closed.map(closedRow).join('')}` : ''}

    <div class="past-link" style="margin-top:16px;">
      ${ICON_CLK} View past missions — March 2026 and earlier
    </div>
  </div>
  <div class="version-tag">v1.7</div>`;
}

/* ─── 3. Mission detail ─────────────────────────────────────────── */
function toggleNoResp() {
  APP.noRespExpanded = !APP.noRespExpanded;
  render();
}

function nudgeAll(missionId) {
  const rs = getResponses(missionId).filter(r => r.availability === 'no_response');
  rs.forEach(r => { APP.nudged[r.memberId] = true; });
  render();
}

function screenMissionDetail() {
  const { missionId } = APP.params;
  const m = getMission(missionId);
  if (!m) return `<p style="padding:20px;">Mission not found.</p>`;

  const counts   = getCounts(m.id);
  const rs       = getResponses(m.id);
  const search   = rs.filter(r => r.availability === 'search');
  const dispatch = rs.filter(r => r.availability === 'dispatch');
  const unavail  = rs.filter(r => r.availability === 'unavailable');
  const noresp   = rs.filter(r => r.availability === 'no_response');
  const log      = [...getLog(m.id)].reverse(); // newest first
  const msnNum   = m.id.replace('msn-','2026-');
  const allNudged      = noresp.length > 0 && noresp.every(r => APP.nudged[r.memberId]);
  const noRespExpanded = !!APP.noRespExpanded;
  const NORESP_LIMIT   = 10;

  function memberNameRow(resp) {
    const member = getMember(resp.memberId);
    if (!member) return '';
    const detail = resp.availability === 'search'
      ? (resp.needsRide ? 'Needs a ride' : resp.canTakePassengers ? 'Can take passenger' : 'Driving solo') + (resp.eta ? ' · ETA ' + resp.eta : '')
      : resp.availability === 'dispatch' ? 'Remote · Available now' : '';
    return `
    <div class="detail-member-row">
      <div class="av ${member.avatarColor}">${member.initials}</div>
      <div class="roster-info">
        <div class="roster-name">${member.name}</div>
        ${detail ? `<div class="roster-detail">${detail}</div>` : ''}
      </div>
    </div>`;
  }

  function statCard(n, label, numClass) {
    return `<div class="detail-stat-card"><div class="stat-n ${numClass}">${n}</div><div class="stat-l">${label}</div></div>`;
  }

  const noRespVisible  = noRespExpanded ? noresp : noresp.slice(0, NORESP_LIMIT);
  const noRespOverflow = noresp.length - NORESP_LIMIT;

  let noRespContent = '';
  if (noresp.length === 0) {
    noRespContent = `<div class="detail-empty" style="color:var(--green);">All members have responded.</div>`;
  } else {
    noRespContent = noRespVisible.map(memberNameRow).join('');
    if (!noRespExpanded && noRespOverflow > 0) {
      noRespContent += `<div class="expand-control" onclick="toggleNoResp()">+ ${noRespOverflow} more</div>`;
    } else if (noRespExpanded && noresp.length > NORESP_LIMIT) {
      noRespContent += `<div class="expand-control" onclick="toggleNoResp()">Show less</div>`;
    }
  }

  return `
  ${renderTopbar()}
  ${bc([
    {label:'Home',screen:'entry'},
    {label:'Missions',screen:'missions-list'},
    {label:'#'+msnNum}
  ])}
  <div class="page detail-page">

    <!-- Mission header card -->
    <div class="card" style="margin-bottom:12px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
        <span style="font-size:12px;color:var(--text-3);">#${msnNum}</span>
        ${statusPill(m.status)}
      </div>

      <div style="font-size:18px;font-weight:600;color:var(--text-1);margin-bottom:6px;">${m.title}</div>

      ${m.description ? `<div style="font-size:14px;color:var(--text-2);line-height:1.65;margin-bottom:10px;">${m.description}</div>` : ''}

      <div style="font-size:13px;color:var(--text-2);line-height:1.8;">
        <b>Agency:</b> ${m.agency} &nbsp;·&nbsp; <b>POC:</b> ${m.poc} · ${m.pocPhone}${m.baseName ? ` &nbsp;·&nbsp; <b>Base:</b> ${m.baseName}${m.baseAddress ? ', '+m.baseAddress:''}` : ''} &nbsp;·&nbsp; <b>Activated:</b> ${m.createdAt}
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
        ${m.status !== 'closed' ? `<button class="btn btn-green btn-sm" onclick="navigate('broadcast-alert',{missionId:'${m.id}'})">Send activation alert</button>` : ''}
        <button class="btn btn-sm">Edit mission</button>
        ${m.status !== 'closed' ? `<button class="btn btn-sm">Close mission</button>` : ''}
      </div>
    </div>

    <!-- Summary stats — white card surface -->
    <div class="detail-stats-row" style="margin-bottom:14px;">
      ${statCard(counts.search,      'Available for search',   'grn')}
      ${statCard(counts.dispatch,    'Available for dispatch', 'blu')}
      ${statCard(counts.unavailable, 'Unavailable',            'red')}
      ${statCard(counts.no_response, 'Not yet responded',      'gry')}
    </div>

    <!-- 12-col grid: 8 response + 4 log -->
    <div class="detail-grid">

      <div class="detail-primary">

        <div class="card" style="margin-bottom:10px;">
          <div class="card-section-title">Available for search <span class="section-count">${counts.search}</span></div>
          ${search.length === 0 ? `<div class="detail-empty">No members available for search yet.</div>` : search.map(memberNameRow).join('')}
        </div>

        <div class="card" style="margin-bottom:10px;">
          <div class="card-section-title">Available for dispatch <span class="section-count">${counts.dispatch}</span></div>
          ${dispatch.length === 0 ? `<div class="detail-empty">No members available for dispatch yet.</div>` : dispatch.map(memberNameRow).join('')}
        </div>

        <div class="card" style="margin-bottom:10px;">
          <div class="card-section-title">Unavailable <span class="section-count">${counts.unavailable}</span></div>
          ${unavail.length === 0 ? `<div class="detail-empty">No members marked unavailable.</div>` : unavail.map(memberNameRow).join('')}
        </div>

        <div class="card">
          <div class="card-section-title" style="display:flex;align-items:center;justify-content:space-between;">
            <span>Not yet responded <span class="section-count">${counts.no_response}</span></span>
            ${noresp.length > 0 ? `<button class="nudge-btn${allNudged?' sent':''}" onclick="nudgeAll('${m.id}')">${allNudged?'All nudged ✓':'Nudge all'}</button>` : ''}
          </div>
          ${noRespContent}
        </div>

      </div>

      <div class="detail-secondary">
        <div class="card">
          <div class="card-section-title">Activity log</div>
          ${log.length === 0
            ? `<div class="detail-empty">No activity yet.</div>`
            : log.map(l => `<div class="log-row"><span class="log-time">${l.timestamp}</span><span class="log-text">${l.text}</span></div>`).join('')}
        </div>
      </div>

    </div>
  </div>
  <div class="version-tag">v1.7</div>`;
}

/* ─── 4. New mission form ───────────────────────────────────────── */
function screenNewMission() {
  const pinned = !!APP.mapPin;
  const coordLabel = APP.mapPin ? APP.mapPin.coord : '';
  return `
  ${renderTopbar()}
  ${bc([
    {label:'Home',screen:'entry'},
    {label:'Missions',screen:'missions-list'},
    {label:'New mission'}
  ])}
  <div class="page">
    <div class="page-hdr">
      <div class="page-title">New mission</div>
      <div class="page-sub">Fill in what you know. You can edit details after the mission is created.</div>
    </div>

    <div class="card">
      <div class="card-section-title">Mission details</div>
      <div class="row2" style="margin-bottom:14px;">
        <div>
          <div class="field-lbl">Mission ID</div>
          <div class="readonly-field">#2026-048 <span class="readonly-note">Auto-generated</span></div>
        </div>
        <div>
          <div class="field-lbl">Status</div>
          <div class="status-pending-box"><div class="status-dot"></div>Standby — awaiting activation decision</div>
        </div>
      </div>
      <div class="field">
        <div class="field-lbl">Incident description <span class="t-req">Required</span></div>
        <textarea id="nm-desc" rows="5" style="min-height:100px;resize:vertical;" placeholder="Describe the situation — who is missing, what happened, last known location, time last seen, terrain, weather, any known hazards..."></textarea>
      </div>

      <div class="divider"></div>

      <div class="field-lbl" style="margin-bottom:10px;font-size:13px;font-weight:600;color:var(--text-1);">Base location <span class="t-opt">Optional</span></div>
      <div class="field">
        <div class="field-lbl" style="font-weight:400;">Name</div>
        <input type="text" id="nm-base-name" placeholder="e.g. Hawksbill Summit Trailhead parking lot">
      </div>
      <div class="field">
        <div class="field-lbl" style="font-weight:400;">Address</div>
        <input type="text" id="nm-base-addr" placeholder="e.g. Skyline Drive, Luray, VA 22835">
      </div>
      <div class="field" style="margin-bottom:0;">
        <div class="field-lbl" style="font-weight:400;margin-bottom:4px;">Pin on map <span class="t-opt">Click map to place pin</span></div>
        ${mapWidget(pinned, coordLabel)}
      </div>
    </div>

    <div class="card">
      <div class="card-section-title">Requesting agency</div>
      <div class="field">
        <div class="field-lbl">Agency name <span class="t-req">Required</span></div>
        <input type="text" id="nm-agency" placeholder="e.g. VDEM, Page Co. Sheriff">
      </div>
      <div class="field">
        <div class="field-lbl">Agency POC</div>
        <div class="row2">
          <input type="text" id="nm-poc" placeholder="POC name — e.g. Ranger M. Flores">
          <input type="tel" id="nm-phone" placeholder="Contact number — e.g. (540) 555-0193">
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-section-title">Internal notes</div>
      <div class="field">
        <div class="field-lbl">Notes <span class="t-opt">Optional</span></div>
        <textarea id="nm-notes" rows="3" style="resize:vertical;min-height:66px;" placeholder="Weather conditions, access road status, gear requirements, etc."></textarea>
      </div>
    </div>

    <div class="form-footer">
      <button class="btn" onclick="navigate('missions-list')">Cancel</button>
      <div class="form-footer-right">
        <span class="t-time">Mission will be saved as Standby</span>
        <button class="btn btn-green" onclick="navigate('missions-list')">Create mission</button>
      </div>
    </div>
  </div>
  <div class="version-tag">v1.7</div>`;
}

/* ─── 5. Broadcast alert ────────────────────────────────────────── */
function screenBroadcastAlert() {
  const { missionId } = APP.params;
  const m = getMission(missionId);
  if (!m) return '<p style="padding:20px;">Mission not found.</p>';
  const msnNum = m.id.replace('msn-','2026-');
  return `
  ${renderTopbar()}
  ${bc([
    {label:'Home',screen:'entry'},
    {label:'Missions',screen:'missions-list'},
    {label:`#${msnNum}`,screen:'mission-detail',params:{missionId}},
    {label:'Send activation alert'}
  ])}
  <div class="page">
    <div class="page-hdr">
      <div class="page-title">Send activation alert</div>
      <div class="page-sub">#${msnNum} · ${m.title}</div>
    </div>

    <div class="card">
      <div class="card-section-title">Alert recipients</div>
      <div class="field">
        <div class="field-lbl">Notify group</div>
        <select><option>All SMRG members (24)</option><option>Certified GTMs only (14)</option><option>On-call members (6)</option></select>
      </div>
      <div class="field">
        <div class="field-lbl">Alert channels</div>
        <select><option>SMS + Email + App push</option><option>SMS only</option><option>Email only</option></select>
      </div>
    </div>

    <div class="card">
      <div class="card-section-title">Message preview</div>
      <div class="alert-banner">
        <div class="alert-banner-title">SAR Ops alert — #${msnNum}</div>
        <div class="alert-banner-body">
          ${m.title}<br>
          ${m.agency} · POC: ${m.poc} ${m.pocPhone}<br>
          ${m.baseName ? `Base: ${m.baseName}<br>` : ''}
          Respond with your availability at sarops.app/r/${m.id}
        </div>
      </div>
      <div class="field">
        <div class="field-lbl">Additional message <span class="t-opt">Optional</span></div>
        <textarea rows="3" style="resize:vertical;" placeholder="Add any additional context for the team..."></textarea>
      </div>
    </div>

    <div class="form-footer">
      <button class="btn" onclick="navigate('mission-detail',{missionId:'${missionId}'})">Cancel</button>
      <button class="btn btn-green" onclick="navigate('mission-detail',{missionId:'${missionId}'})">Send alert to 24 members</button>
    </div>
  </div>
  <div class="version-tag">v1.7</div>`;
}

/* ─── 6. Member alert response ──────────────────────────────────── */
function screenMemberAlert() {
  const { missionId } = APP.params;
  const m = getMission(missionId || 'msn-047');
  const draft = APP.memberResponseDraft;
  const msnNum = (m ? m.id : 'msn-047').replace('msn-','2026-');

  function respBtn(val, label) {
    const cls = draft.availability === val ? `sel-${val==='no_response'?'unavail':val}` : '';
    return `<button class="resp-btn ${cls}" onclick="setMemberAvail('${val}')">${label}</button>`;
  }

  const submitted = draft.submitted;

  return `
  ${renderTopbar()}
  <div class="page">
    <div class="page-hdr">
      <div class="page-title">Incoming alert</div>
    </div>

    <div class="alert-banner">
      <div class="alert-banner-title">Mission alert — #${msnNum}</div>
      <div class="alert-banner-body">
        ${m ? m.title : 'SAR activation'}<br>
        ${m ? `${m.agency} · POC: ${m.poc} ${m.pocPhone}` : ''}<br>
        ${m && m.description ? m.description.substring(0,120)+'...' : ''}
      </div>
    </div>

    ${submitted ? `
    <div class="card">
      <div style="text-align:center;padding:12px 0;">
        <div style="font-size:24px;margin-bottom:8px;">✓</div>
        <div style="font-size:15px;font-weight:600;color:var(--green);margin-bottom:4px;">Response sent</div>
        <div class="t-meta">${draft.availability === 'search' ? 'Available for search' : draft.availability === 'dispatch' ? 'Available for dispatch' : 'Marked unavailable'}${draft.eta ? ' · ETA ' + draft.eta : ''}</div>
      </div>
    </div>
    ${draft.availability === 'search' ? `
    <div class="card">
      <div class="card-section-title">Gear checklist</div>
      ${['Navigation (map + compass)','First aid kit','Headlamp + batteries','Water (2L min)','Emergency bivy','High-vis vest','Radio / comms device'].map((item,i)=>`
      <div class="gear-item" onclick="toggleGear(${i},this)">
        <div class="gear-box ${APP.gearChecked[i]?'checked':''}">${APP.gearChecked[i]?`<svg width="9" height="9" viewBox="0 0 9 9" fill="none"><polyline points="1.5,4.5 3.5,6.5 7.5,2.5" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`:''}
        </div>
        <span>${item}</span>
      </div>`).join('')}
    </div>` : ''}
    ` : `
    <div class="card">
      <div class="card-section-title">Can you respond?</div>
      <div class="resp-btns">
        ${respBtn('search','Available for search')}
        ${respBtn('dispatch','Available for dispatch')}
        ${respBtn('unavailable','Unavailable')}
      </div>

      ${draft.availability === 'search' ? `
      <div class="divider"></div>
      <div class="field">
        <div class="field-lbl">Drive status</div>
        <select onchange="APP.memberResponseDraft.driveStatus=this.value">
          <option>Driving solo</option>
          <option>Can take a passenger</option>
          <option>Needs a ride</option>
        </select>
      </div>
      <div class="field">
        <div class="field-lbl">Departure &amp; ETA</div>
        <div class="row2">
          <div>
            <div style="font-size:11px;color:var(--text-3);margin-bottom:3px;">Departs</div>
            <input type="time" id="mb-depart">
          </div>
          <div>
            <div style="font-size:11px;color:var(--text-3);margin-bottom:3px;">ETA at base</div>
            <input type="time" id="mb-eta">
          </div>
        </div>
      </div>
      <div class="field">
        <div class="field-lbl">Vehicle <span class="t-opt">For dispatcher</span></div>
        <input type="text" id="mb-vehicle" placeholder="e.g. Blue Honda CR-V · VA · ABC-1234">
      </div>
      ` : ''}

      ${draft.availability ? `
      <button class="btn btn-green" style="width:100%;margin-top:4px;" onclick="submitMemberResponse()">Send to dispatcher</button>
      ` : ''}
    </div>
    `}
  </div>
  <div class="version-tag">v1.7</div>`;
}

/* ════════════════════════════════════════════════════════════════
   EVENT HANDLERS
   ════════════════════════════════════════════════════════════════ */

function selectRole(role) {
  APP.currentUser = role === 'dispatcher'
    ? { id: 'm1', name: 'Alex (you)', initials: 'AL', avatarColor: 'av-blue', role: 'dispatcher' }
    : { id: 'm5', name: 'Jordan B.', initials: 'JB', avatarColor: 'av-purple', role: 'member' };
  navigate(role === 'dispatcher' ? 'missions-list' : 'member-alert', { missionId: 'msn-047' });
}

function nudgeMember(memberId) {
  APP.nudged[memberId] = true;
  render();
}

function handleMapClick(e) {
  const body = document.getElementById('map-body');
  if (!body) return;
  const rect = body.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const coord = USNG_SAMPLES[Math.floor(Math.random() * USNG_SAMPLES.length)];
  APP.mapPin = { x, y, coord };
  render();
}

function clearMapPin() {
  APP.mapPin = null;
  render();
}

function setMemberAvail(val) {
  APP.memberResponseDraft.availability = val;
  render();
}

function submitMemberResponse() {
  const eta = document.getElementById('mb-eta');
  if (eta) APP.memberResponseDraft.eta = eta.value;
  APP.memberResponseDraft.submitted = true;
  render();
}

function toggleGear(idx, row) {
  APP.gearChecked[idx] = !APP.gearChecked[idx];
  render();
}

/* ════════════════════════════════════════════════════════════════
   RENDER
   ════════════════════════════════════════════════════════════════ */
function render() {
  const root = document.getElementById('root');
  switch (APP.screen) {
    case 'entry':           root.innerHTML = screenEntry(); break;
    case 'missions-list':   root.innerHTML = screenMissionsList(); break;
    case 'mission-detail':  root.innerHTML = screenMissionDetail(); break;
    case 'new-mission':     root.innerHTML = screenNewMission(); break;
    case 'broadcast-alert': root.innerHTML = screenBroadcastAlert(); break;
    case 'member-alert':    root.innerHTML = screenMemberAlert(); break;
    default:                root.innerHTML = screenEntry();
  }

  /* Re-attach map pin position after re-render */
  if (APP.mapPin) {
    const pin = document.getElementById('pin-el');
    if (pin) {
      pin.style.left = APP.mapPin.x + 'px';
      pin.style.top  = APP.mapPin.y + 'px';
    }
  }
}

/* Boot */
document.addEventListener('DOMContentLoaded', render);
