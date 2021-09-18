import {defaultActivities, defaultCoupons} from '@/../mock/activity';

const ActivityModel = {
  namespace: 'activity',
  state: {
    activities: defaultActivities,
    coupons: defaultCoupons,
  },
  effects: {},
  reducers: {
    /**
     * activities
    */
    setActivities(state, { payload }) {
      return {
        ...state,
        activities: payload || [],
      };
    },
    addActivities(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newActivities = [].concat(state.activities);
      newActivities.push(payload);
      return {
        ...state,
        activities: newActivities,
      };
    },
    updateActivities(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newActivities = state.activities.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        activities: newActivities,
      };
    },
    deleteActivities(state, { payload }) {
      if (!payload) {
        return state;
      }
      const i = state.activities.findIndex((item) => item.id === payload.id);
      const newActivities = [].concat(state.activities);
      if (i > -1 && state.activities.length > i) {
        newActivities.splice(i, 1);
      }
      return {
        ...state,
        activities: newActivities,
      };
    },

    /**
     * coupons
    */
     setCoupons(state, { payload }) {
      return {
        ...state,
        coupons: payload || [],
      };
    },
    addCoupons(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newCoupons = [].concat(state.coupons);
      newCoupons.push(payload);
      return {
        ...state,
        coupons: newCoupons,
      };
    },
    updateCoupons(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newCoupons = state.coupons.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        coupons: newCoupons,
      };
    },
    deleteCoupons(state, { payload }) {
      if (!payload) {
        return state;
      }
      const i = state.coupons.findIndex((item) => item.id === payload.id);
      const newCoupons = [].concat(state.coupons);
      if (i > -1 && state.coupons.length > i) {
        newCoupons.splice(i, 1);
      }
      return {
        ...state,
        coupons: newCoupons,
      };
    },
  },
};
export default ActivityModel;
