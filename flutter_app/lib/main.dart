import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Color(0xFF0F172A),
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const ScrapmandiApp());
}

class ScrapmandiApp extends StatelessWidget {
  const ScrapmandiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Scrapmandi',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF090D16),
        fontFamily: 'Roboto',
      ),
      home: const ScrapmandiWebViewScreen(),
    );
  }
}

class ScrapmandiWebViewScreen extends StatefulWidget {
  const ScrapmandiWebViewScreen({super.key});

  @override
  State<ScrapmandiWebViewScreen> createState() => _ScrapmandiWebViewScreenState();
}

class _ScrapmandiWebViewScreenState extends State<ScrapmandiWebViewScreen> {
  late final WebViewController _controller;
  int _loadingProgress = 0;
  bool _hasError = false;

  static const String baseUrl = 'https://scrapmandi.web.app';

  @override
  void initState() {
    super.initState();

    final WebViewController controller = WebViewController();

    // Android specific WebView hardware acceleration and smooth scrolling
    if (controller.platform is AndroidWebViewController) {
      AndroidWebViewController.enableDebugging(false);
      (controller.platform as AndroidWebViewController)
        ..setMediaPlaybackRequiresUserGesture(false);
    }

    controller
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF090D16))
      ..setUserAgent("Mozilla/5.0 (Linux; Android 14; Mobile; ScrapmandiNativeApp/2.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36")
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            setState(() {
              _loadingProgress = progress;
            });
          },
          onPageStarted: (String url) {
            setState(() {
              _hasError = false;
            });
          },
          onPageFinished: (String url) {
            setState(() {
              _loadingProgress = 100;
            });
          },
          onWebResourceError: (WebResourceError error) {
            if (error.isForMainFrame ?? true) {
              setState(() {
                _hasError = true;
              });
            }
          },
          onNavigationRequest: (NavigationRequest request) async {
            final url = request.url;

            // Open external dialer, WhatsApp, and email links in native apps
            if (url.startsWith('https://wa.me/') ||
                url.startsWith('whatsapp://') ||
                url.startsWith('tel:') ||
                url.startsWith('mailto:')) {
              final uri = Uri.parse(url);
              try {
                if (await canLaunchUrl(uri)) {
                  await launchUrl(uri, mode: LaunchMode.externalApplication);
                }
              } catch (_) {}
              return NavigationDecision.prevent;
            }

            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(baseUrl));

    _controller = controller;
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        if (await _controller.canGoBack()) {
          await _controller.goBack();
        } else {
          SystemNavigator.pop();
        }
      },
      child: Scaffold(
        backgroundColor: const Color(0xFF090D16),
        // No redundant native AppBar or BottomNavBar — eliminates double header/footer!
        body: SafeArea(
          top: true,
          bottom: false,
          child: Stack(
            children: [
              // Main Fullscreen Edge-to-Edge Webview
              if (!_hasError)
                Positioned.fill(
                  child: WebViewWidget(controller: _controller),
                ),

              // Top Slim Loading Indicator (only visible while page is loading)
              if (_loadingProgress < 100 && !_hasError)
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: SizedBox(
                    height: 2.5,
                    child: LinearProgressIndicator(
                      value: _loadingProgress / 100.0,
                      backgroundColor: Colors.transparent,
                      valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)),
                    ),
                  ),
                ),

              // Offline Error Fallback
              if (_hasError)
                Positioned.fill(
                  child: Container(
                    color: const Color(0xFF090D16),
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.wifi_off_rounded, color: Color(0xFF10B981), size: 64),
                        const SizedBox(height: 16),
                        const Text(
                          'No Internet Connection',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Please connect to Wi-Fi or mobile data to access live ScrapMandi rates.',
                          style: TextStyle(fontSize: 13, color: Colors.grey),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 24),
                        ElevatedButton.icon(
                          onPressed: () {
                            setState(() {
                              _hasError = false;
                              _loadingProgress = 0;
                            });
                            _controller.loadRequest(Uri.parse(baseUrl));
                          },
                          icon: const Icon(Icons.refresh),
                          label: const Text('Retry Connection'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF10B981),
                            foregroundColor: Colors.black,
                            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
