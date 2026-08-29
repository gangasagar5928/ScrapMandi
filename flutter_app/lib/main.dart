import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Color(0xFF0F172A),
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
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF10B981),
          secondary: Color(0xFF059669),
          surface: Color(0xFF0F172A),
          onPrimary: Colors.black,
          onSurface: Colors.white,
        ),
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
  int _currentNavIndex = 0;

  static const String baseUrl = 'https://scrapmandi.web.app';

  @override
  void initState() {
    super.initState();

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF090D16))
      ..setUserAgent("Mozilla/5.0 (Linux; Android 14; Mobile; ScrapmandiApp/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36")
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
            // Only flag main frame errors as full screen errors
            if (error.isForMainFrame ?? true) {
              setState(() {
                _hasError = true;
              });
            }
          },
          onNavigationRequest: (NavigationRequest request) async {
            final url = request.url;

            // Handle WhatsApp, tel, and mailto external links
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
  }

  void _navigateToTab(int index) {
    setState(() {
      _currentNavIndex = index;
    });

    switch (index) {
      case 0:
        _controller.loadRequest(Uri.parse('$baseUrl/'));
        break;
      case 1:
        _controller.loadRequest(Uri.parse('$baseUrl/#browse'));
        break;
      case 2:
        _controller.loadRequest(Uri.parse('$baseUrl/#vendor-dashboard'));
        break;
      case 3:
        _controller.loadRequest(Uri.parse('$baseUrl/#indicative-prices'));
        break;
      case 4:
        _controller.loadRequest(Uri.parse('$baseUrl/#whatsapp-alerts'));
        break;
    }
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
        appBar: AppBar(
          backgroundColor: const Color(0xFF0F172A),
          elevation: 0,
          titleSpacing: 12,
          title: Row(
            children: [
              Image.asset(
                'assets/logo.png',
                width: 32,
                height: 32,
                errorBuilder: (_, __, ___) => const Icon(Icons.recycling, color: Color(0xFF10B981)),
              ),
              const SizedBox(width: 8),
              RichText(
                text: const TextSpan(
                  text: 'Scrap',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white),
                  children: [
                    TextSpan(
                      text: 'mandi',
                      style: TextStyle(color: Color(0xFF10B981)),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 6),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: const Color(0xFF059669).withOpacity(0.2),
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: const Color(0xFF059669).withOpacity(0.4)),
                ),
                child: const Text(
                  'DELHI NCR',
                  style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Color(0xFF34D399)),
                ),
              ),
            ],
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.refresh, color: Colors.white70, size: 20),
              tooltip: 'Reload',
              onPressed: () => _controller.reload(),
            ),
          ],
          bottom: _loadingProgress < 100
              ? PreferredSize(
                  preferredSize: const Size.fromHeight(2.5),
                  child: LinearProgressIndicator(
                    value: _loadingProgress / 100.0,
                    backgroundColor: Colors.transparent,
                    valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)),
                    minHeight: 2.5,
                  ),
                )
              : null,
        ),
        body: _hasError
            ? Center(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.wifi_off_rounded, color: Color(0xFF10B981), size: 64),
                      const SizedBox(height: 16),
                      const Text(
                        'Unable to connect to ScrapMandi',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'Please check your internet connection and try again.',
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
              )
            : WebViewWidget(controller: _controller),
        bottomNavigationBar: NavigationBar(
          selectedIndex: _currentNavIndex,
          onDestinationSelected: _navigateToTab,
          backgroundColor: const Color(0xFF0F172A),
          indicatorColor: const Color(0xFF059669).withOpacity(0.3),
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.home_outlined, color: Colors.grey),
              selectedIcon: Icon(Icons.home, color: Color(0xFF10B981)),
              label: 'Home',
            ),
            NavigationDestination(
              icon: Icon(Icons.search_outlined, color: Colors.grey),
              selectedIcon: Icon(Icons.search, color: Color(0xFF10B981)),
              label: 'Browse',
            ),
            NavigationDestination(
              icon: Icon(Icons.add_circle_outline, color: Colors.grey),
              selectedIcon: Icon(Icons.add_circle, color: Color(0xFF10B981)),
              label: 'Sell',
            ),
            NavigationDestination(
              icon: Icon(Icons.trending_up_outlined, color: Colors.grey),
              selectedIcon: Icon(Icons.trending_up, color: Color(0xFF10B981)),
              label: 'Spot Bhav',
            ),
            NavigationDestination(
              icon: Icon(Icons.chat_bubble_outline, color: Colors.grey),
              selectedIcon: Icon(Icons.chat_bubble, color: Color(0xFF10B981)),
              label: 'WhatsApp',
            ),
          ],
        ),
      ),
    );
  }
}
