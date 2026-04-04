import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class DatabaseService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  private isConnected = false;

  /**
   * 1. Called once the host module's dependencies have been resolved.
   * Useful for initializing internal state.
   */
  onModuleInit() {
    this.isConnected = true;
    console.log('1. [OnModuleInit]: DatabaseService module initialized.');
  }

  getStatus() {
    this.isConnected
      ? console.log('Database is connected.')
      : console.log('Database is not connected.');
  }
  /**
   * 2. Called once all modules have been initialized, but before listening for connections.
   * Best place to run logic that requires the full app tree to be ready.
   */
  onApplicationBootstrap() {
    console.log(
      '2. [OnApplicationBootstrap]: Application is ready to start accepting connections.',
    );
  }

  /**
   * 3. Called after a termination signal (like SIGTERM) is received.
   * Used to start "cleanup" mode.
   */
  onModuleDestroy() {
    console.log('3. [OnModuleDestroy]: Cleanup initiated.');
  }

  /**
   * 4. Called before the application closes connections.
   * This is an async-friendly hook for pre-shutdown logic.
   */
  beforeApplicationShutdown(signal?: string) {
    console.log(
      `4. [BeforeApplicationShutdown]: Received signal: ${signal}. Closing resources...`,
    );
  }

  /**
   * 5. Called after connections are closed.
   * The final step before the process exits.
   */
  onApplicationShutdown(signal?: string) {
    this.isConnected = false;
    console.log(`5. [OnApplicationShutdown]: Connections closed. Goodbye!`);
  }
}
