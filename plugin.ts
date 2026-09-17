import { createEndpointRuntimeState } from 'zhin.js/adapter';
import { definePlugin } from 'zhin.js';
import { permissionHostToken, createSceneRolePlatformChecker } from '@zhin.js/permission';
import { stateToken } from './src/state.js';

export default definePlugin({
  name: 'douyin',
  metadata: {
    displayName: 'Douyin Adapter',
  },
  setup(context) {
    context.resources.provide(stateToken, createEndpointRuntimeState());
    if (context.resources.has(permissionHostToken)) {
      const host = context.resources.use(permissionHostToken);
      return host.registerPlatform('douyin', createSceneRolePlatformChecker());
    }
  },
});