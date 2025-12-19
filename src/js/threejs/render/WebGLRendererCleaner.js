export 
class WebGLRendererCleaner {
  dispose(renderer) {
    if (!renderer) return;
    renderer.setAnimationLoop(null);

    renderer.dispose();
  }
}